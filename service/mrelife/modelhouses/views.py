from datetime import datetime

from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from mrelife.events.models import Event, EventModelHouse
from mrelife.modelhouses.models import (ModelHouse, ModelHouseOutletStore,
                                        ModelHouseTag, ModelHouseUser)
from mrelife.modelhouses.serializers import (ModelHouseNestedSerializer,
                                             ModelHouseSerializer)
from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.model_house_permission import ModelHousePermission
from mrelife.utils.querys import get_or_none


class ModelHouseViewSet(ModelViewSet):
    queryset = ModelHouse.objects.all()
    serializer_class = ModelHouseSerializer
    permission_classes = (IsAuthenticated, ModelHousePermission,)
    parser_class = (FormParser, MultiPartParser, JSONParser)

    def create(self, request, *args, **kwargs):
        obj = super(ModelHouseViewSet, self).create(request, *args, **kwargs)
        house = ModelHouse.objects.get(pk=obj.data['id'])
        if not (IsStore(request.user) or IsSub(request.user)):
            try:
                store = OutletStore.objects.get(pk=int(request.data.get('store')))
            except Exception:
                store = None
        else:
            store = request.user.store
            ModelHouseUser.objects.create(user_id=request.user.id, model_house=house)

        if store is None:
            house.delete()
            return Response({
                'status': False,
                'messageCode': 'MH001',
                'messageParams': {},
                'data': {}
            }, status=status.HTTP_404_NOT_FOUND)

        events = request.data.get('events')
        if events is not None:
            for event in events:
                try:
                    EventModelHouse.objects.create(event_id=event, model_house=house)
                except Exception:
                    pass

        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    ModelHouseTag.objects.create(tag=tag, model_house=house)

        ModelHouseOutletStore.objects.create(outlet_store=store, model_house=house)

        return obj

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ModelHouseNestedSerializer
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_event(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def remove_event(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def add_tag(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def remove_tag(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def add_media(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def remove_media(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def add_user(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def remove_user(self, request, *args, **kwargs):
        pass

    @detail_route(methods=['post'])
    def create_user(self, request, *args, **kwargs):
        pass
