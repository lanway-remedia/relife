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

from mrelife.examplehouses.models import (ExampleHouse, ExampleHouseCommitment,
                                        ExampleHouseStyle, ExampleHouseTag)
from mrelife.examplehouses.serializers import (ExampleHouseNestedSerializer,
                                             ExampleHouseSerializer)
from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.model_house_permission import ModelHousePermission
from mrelife.utils.querys import get_or_none


class ExampleHouseViewSet(ModelViewSet):
    queryset = ExampleHouse.objects.all()
    serializer_class = ExampleHouseSerializer
    permission_classes = (IsAuthenticated, ModelHousePermission,)
    parser_class = (FormParser, MultiPartParser, JSONParser)
    pagination_class = LimitOffsetPagination

    def create(self, request, *args, **kwargs):
        """
            POST:
            store: int
            tags = []
            styles = []
            commitments = []
        """
        request.data['create_user'] = request.user.id
        obj = super(ExampleHouseViewSet, self).create(request, *args, **kwargs)
        house = ExampleHouse.objects.get(pk=obj.data['id'])
        if not (IsStore(request.user) or IsSub(request.user)):
            try:
                store = OutletStore.objects.get(pk=int(request.data.get('store')))
            except Exception:
                store = None
        else:
            store = request.user.store

        if store is None:
            house.delete()
            return Response({
                'status': False,
                'messageCode': 'MH001',
                'messageParams': {},
                'data': {}
            }, status=status.HTTP_404_NOT_FOUND)
        house.store = store
        house.save()

        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    ExampleHouseTag.objects.create(tag=tag, example_house=house)

        styles = request.data.get('styles')
        if styles is not None:
            for style in styles:
                try:
                    ExampleHouseStyle.objects.create(style_id=style, example_house=house)
                except Exception:
                    pass

        commitments = request.data.get('commitments')
        if commitments is not None:
            for commitment in commitments:
                try:
                    ExampleHouseCommitment.objects.create(commitment_id=commitment, example_house=house)
                except Exception:
                    pass
        return obj

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ExampleHouseNestedSerializer
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        obj = super(ExampleHouseViewSet, self).update(request, *args, **kwargs)
        return obj

    @detail_route(methods=['post'])
    def add_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    if created or not house.tags.filter(tag=tag).exists():
                        ExampleHouseTag.objects.create(tag=tag, example_house=house)
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        tags = request.data.get('tags')
        if tags is not None:
            for tag in tags:
                try:
                    _tag = ExampleHouseTag.objects.filter(tag_id=tag, example_house=house)
                    _tag.delete()
                except Exception:
                    pass
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_style(self, request, *args, **kwargs):
        """
            POST:
                styles: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        styles = request.data.get('styles')
        if styles is not None:
            for style in styles:
                try:
                    style, created = ExampleHouseStyle.objects.get_or_create(style_id=style, example_house=house)
                except Exception:
                    pass
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_style(self, request, *args, **kwargs):
        """
            POST:
                styles: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        styles = request.data.get('styles')
        if styles is not None:
            for style in styles:
                try:
                    _style = ExampleHouseStyle.objects.filter(style_id=style, example_house=house)
                    _style.delete()
                except Exception:
                    pass
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def add_commitment(self, request, *args, **kwargs):
        """
            POST:
                commitments: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        commitments = request.data.get('commitments')
        if commitments is not None:
            for commitment in commitments:
                try:
                    commitment, created = ExampleHouseCommitment.objects.get_or_create(
                        commitment_id=commitment, example_house=house)
                except Exception:
                    pass
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)

    @detail_route(methods=['post'])
    def remove_commitment(self, request, *args, **kwargs):
        """
            POST:
                commitments: []
        """
        house = ExampleHouse.objects.get(pk=kwargs['pk'])
        commitments = request.data.get('commitments')
        if commitments is not None:
            for commitment in commitments:
                try:
                    _commitment = ExampleHouseCommitment.objects.filter(commitment_id=commitment, example_house=house)
                    _commitment.delete()
                except Exception:
                    pass
        return super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
