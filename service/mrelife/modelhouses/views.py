from datetime import datetime

from django.conf import settings
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from mrelife.events.models import Event, EventModelHouse
from mrelife.modelhouses.models import ModelHouse, ModelHouseMedia, ModelHouseOutletStore, ModelHouseTag, ModelHouseUser
from mrelife.modelhouses.serializers import ModelHouseNestedSerializer, ModelHouseSerializer
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
    pagination_class = LimitOffsetPagination

    def create(self, request, *args, **kwargs):
        request.data['create_user'] = request.user.id
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

        medias = request.data.getlist('medias')
        count = 0
        for media in medias:
            if count < 5:
                file = default_storage.save(media.name, media)
                ModelHouseMedia.objects.create(model_house=house, url=settings.MEDIA_URL + file)
                count += 1
        return obj

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ModelHouseNestedSerializer
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        obj = super(ModelHouseViewSet, self).update(request, *args, **kwargs)
        return obj

    @detail_route(methods=['post'])
    def add_event(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        events = request.data.get('events')
        if events is not None:
            for event in events:
                try:
                    if not house.events.filter(event_id=event).exists():
                        EventModelHouse.objects.create(event_id=event, model_house=house)
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_event(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        events = request.data.get('events')
        if events is not None:
            for event in events:
                try:
                    _event = EventModelHouse.objects.filter(event_id=event, model_house=house)
                    _event.delete()
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_tag(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    if created or not house.tags.filter(tag=tag).exists():
                        ModelHouseTag.objects.create(tag=tag, model_house=house)
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_tag(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        tags = request.data.get('tags')
        if tags is not None:
            for tag in tags:
                try:
                    _tag = ModelHouseTag.objects.filter(tag_id=tag, model_house=house)
                    _tag.delete()
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_media(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        medias = request.data.getlist('medias')
        count = 0
        for media in medias:
            if count < 5:
                file = default_storage.save(media.name, media)
                ModelHouseMedia.objects.create(model_house=house, url=settings.MEDIA_URL + file)
                count += 1
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_media(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        medias = request.data.get('medias')
        if medias is not None:
            for media in medias:
                try:
                    _media = ModelHouseMedia.objects.get(pk=media)
                    _media.delete()
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_user(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        users = request.data.get('users')
        if users is not None:
            for user in users:
                try:
                    if not house.users.filter(user_id=user).exists():
                        ModelHouseUser.objects.create(user_id=request.user.id, model_house=house)
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_user(self, request, *args, **kwargs):
        house = ModelHouse.objects.get(pk=kwargs['pk'])
        users = request.data.get('users')
        if users is not None:
            for user in users:
                try:
                    _user = ModelHouseUser.objects.filter(user_id=user, model_house=house)
                    _user.delete()
                except Exception:
                    pass
        return super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
