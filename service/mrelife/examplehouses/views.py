"""
    Example house
"""
from django.http import Http404
from rest_framework.decorators import detail_route
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from url_filter.integrations.drf import DjangoFilterBackend

from mrelife.examplehouses.models import ExampleHouse, ExampleHouseCommitment, ExampleHouseStyle, ExampleHouseTag
from mrelife.examplehouses.serializers import (
    ExampleHouseNestedNameOnlySerializer,
    ExampleHouseNestedSerializer,
    ExampleHouseSerializer
)
from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag
from mrelife.utils.groups import IsStore, IsSub
from mrelife.utils.model_house_permission import ModelHousePermission
from mrelife.utils.response import response_200, response_201, response_404


class ExampleHouseViewSet(ModelViewSet):
    queryset = ExampleHouse.objects.all()
    serializer_class = ExampleHouseSerializer
    permission_classes = (IsAuthenticated, ModelHousePermission,)
    parser_class = (FormParser, MultiPartParser, JSONParser)
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['store_id']

    def list(self, request, *args, **kwargs):
        """
            Can filter store_id by adding parameter on url
            GET: ?store_id=INT
        """
        try:
            self.serializer_class = ExampleHouseNestedNameOnlySerializer
            response = super(ExampleHouseViewSet, self).list(request, *args, **kwargs)
            return response_200('EX200', '', response.data)
        except Http404:
            return response_404('EX404')

    def retrieve(self, request, *args, **kwargs):
        try:
            self.serializer_class = ExampleHouseNestedSerializer
            response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
            return response_200('EX202', '', response.data)
        except Http404:
            return response_404('EX404')

    def create(self, request, *args, **kwargs):
        """
            POST:
            store: int
            tags = []
            styles = []
            commitments = []
        """
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
            return response_404('EX404')

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

        return response_201('EX201', '', obj.data)

    def update(self, request, *args, **kwargs):
        try:
            response = super(ExampleHouseViewSet, self).update(request, *args, **kwargs)
            return response_200('EX203', '', response.data)
        except Http404:
            return response_404('EX404')

    def partial_update(self, request, *args, **kwargs):
        try:
            response = super(ExampleHouseViewSet, self).partial_update(request, *args, **kwargs)
            return response_200('EX204', '', response.data)
        except Http404:
            return response_404('EX404')

    def destroy(self, request, *args, **kwargs):
        try:
            response = super(ExampleHouseViewSet, self).destroy(request, *args, **kwargs)
            return response_200('EX205', '', response.data)
        except Http404:
            return response_404('EX404')

    @detail_route(methods=['post'])
    def add_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    if created or not house.tags.filter(tag=tag).exists():
                        ExampleHouseTag.objects.create(tag=tag, example_house=house)
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX206', '', response.data)

    @detail_route(methods=['post'])
    def remove_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        tags = request.data.get('tags')
        if tags is not None:
            for tag in tags:
                try:
                    _tag = ExampleHouseTag.objects.filter(tag_id=tag, example_house=house)
                    _tag.delete()
                except Exception:
                    pass
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX207', '', response.data)

    @detail_route(methods=['post'])
    def add_style(self, request, *args, **kwargs):
        """
            POST:
                styles: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        styles = request.data.get('styles')
        if styles is not None:
            for style in styles:
                try:
                    style, created = ExampleHouseStyle.objects.get_or_create(style_id=style, example_house=house)
                except Exception:
                    pass
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX208', '', response.data)

    @detail_route(methods=['post'])
    def remove_style(self, request, *args, **kwargs):
        """
            POST:
                styles: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        styles = request.data.get('styles')
        if styles is not None:
            for style in styles:
                try:
                    _style = ExampleHouseStyle.objects.filter(style_id=style, example_house=house)
                    _style.delete()
                except Exception:
                    pass
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX209', '', response.data)

    @detail_route(methods=['post'])
    def add_commitment(self, request, *args, **kwargs):
        """
            POST:
                commitments: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        commitments = request.data.get('commitments')
        if commitments is not None:
            for commitment in commitments:
                try:
                    commitment, created = ExampleHouseCommitment.objects.get_or_create(
                        commitment_id=commitment, example_house=house)
                except Exception:
                    pass
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX210', '', response.data)

    @detail_route(methods=['post'])
    def remove_commitment(self, request, *args, **kwargs):
        """
            POST:
                commitments: []
        """
        try:
            house = ExampleHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('EX404')

        commitments = request.data.get('commitments')
        if commitments is not None:
            for commitment in commitments:
                try:
                    _commitment = ExampleHouseCommitment.objects.filter(commitment_id=commitment, example_house=house)
                    _commitment.delete()
                except Exception:
                    pass
        response = super(ExampleHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('EX211', '', response.data)
