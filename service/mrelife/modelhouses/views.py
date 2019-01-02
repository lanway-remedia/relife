import re
from datetime import datetime

from django.conf import settings
from django.core.files.storage import default_storage
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import (action, detail_route, list_route,
                                       permission_classes)
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.events.models import Event, EventModelHouse
from mrelife.modelhouses.models import (ModelHouse, ModelHouseMedia,
                                        ModelHouseOutletStore, ModelHouseTag,
                                        ModelHouseUser, OrderModelHouse)
from mrelife.modelhouses.serializers import (ModelHouseNestedSerializer,
                                             ModelHouseSerializer,
                                             OrderModelHouseSerializer,
                                             OrderModelHouseStatusSerializer)
from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.model_house_permission import ModelHousePermission
from mrelife.utils.order_model_house_permission import (OrderMHUserListPermission,
                                                        OrderMHViewadminPermission)
from mrelife.utils.querys import get_or_none
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.response import response_200, response_201, response_404


class ModelHouseViewSet(ModelViewSet):
    queryset = ModelHouse.objects.all()
    serializer_class = ModelHouseSerializer
    permission_classes = (IsAuthenticated, ModelHousePermission,)
    parser_class = (FormParser, MultiPartParser, JSONParser)
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            response = super(ModelHouseViewSet, self).list(request, *args, **kwargs)
            return response_200('MH200', '', response.data)
        except Http404:
            return response_404('MH404')

    def retrieve(self, request, *args, **kwargs):
        try:
            self.serializer_class = ModelHouseNestedSerializer
            response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
            return response_200('MH202', '', response.data)
        except Http404:
            return response_404('MH404')

    def create(self, request, *args, **kwargs):
        """
            POST:
                store: int
                events: []
                tags: []
                medias: []
        """
        response = super(ModelHouseViewSet, self).create(request, *args, **kwargs)
        house = ModelHouse.objects.get(pk=response.data['id'])
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
            return response_404('MH404')

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

        if 'medias' in request.POST:
            medias = request.data.getlist('medias')
            count = 0
            for media in medias:
                if count < 5:
                    file = default_storage.save(media.name, media)
                    ModelHouseMedia.objects.create(model_house=house, url=settings.MEDIA_URL + file)
                    count += 1

        return response_201('EMH201', '', response.data)

    def update(self, request, *args, **kwargs):
        try:
            response = super(ModelHouseViewSet, self).update(request, *args, **kwargs)
            return response_200('MH203', '', response.data)
        except Http404:
            return response_404('MH404')

    def partial_update(self, request, *args, **kwargs):
        try:
            response = super(ModelHouseViewSet, self).partial_update(request, *args, **kwargs)
            return response_200('MH204', '', response.data)
        except Http404:
            return response_404('MH404')

    def destroy(self, request, *args, **kwargs):
        try:
            response = super(ModelHouseViewSet, self).destroy(request, *args, **kwargs)
            return response_200('MH205', '', response.data)
        except Http404:
            return response_404('MH404')

    @detail_route(methods=['post'])
    def add_event(self, request, *args, **kwargs):
        """
            POST:
                events: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        events = request.data.get('events')
        if events is not None:
            for event in events:
                try:
                    if not house.events.filter(event_id=event).exists():
                        EventModelHouse.objects.create(event_id=event, model_house=house)
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH206', '', response.data)

    @detail_route(methods=['post'])
    def remove_event(self, request, *args, **kwargs):
        """
            POST:
                events: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        events = request.data.get('events')
        if events is not None:
            for event in events:
                try:
                    _event = EventModelHouse.objects.filter(event_id=event, model_house=house)
                    _event.delete()
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH207', '', response.data)

    @detail_route(methods=['post'])
    def add_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        tags = request.data.get('tags')
        if tags is not None:
            for tag_name in tags:
                if not (tag_name == '' or tag_name is None):
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    if created or not house.tags.filter(tag=tag).exists():
                        ModelHouseTag.objects.create(tag=tag, model_house=house)
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH208', '', response.data)

    @detail_route(methods=['post'])
    def remove_tag(self, request, *args, **kwargs):
        """
            POST:
                tags: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        tags = request.data.get('tags')
        if tags is not None:
            for tag in tags:
                try:
                    _tag = ModelHouseTag.objects.filter(tag_id=tag, model_house=house)
                    _tag.delete()
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH209', '', response.data)

    @detail_route(methods=['post'])
    def add_media(self, request, *args, **kwargs):
        """
            POST:
                medias: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        medias = request.data.getlist('medias')
        count = 0
        for media in medias:
            if count < 5:
                file = default_storage.save(media.name, media)
                ModelHouseMedia.objects.create(model_house=house, url=settings.MEDIA_URL + file)
                count += 1
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH210', '', response.data)

    @detail_route(methods=['post'])
    def remove_media(self, request, *args, **kwargs):
        """
            POST:
                medias: []
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        medias = request.data.get('medias')
        if medias is not None:
            for media in medias:
                try:
                    _media = ModelHouseMedia.objects.get(pk=media)
                    _media.delete()
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH211', '', response.data)

    @detail_route(methods=['post'])
    def add_user(self, request, *args, **kwargs):
        """
            GET:
            POST:
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        users = request.data.get('users')
        if users is not None:
            for user in users:
                try:
                    if not house.users.filter(user_id=user).exists():
                        ModelHouseUser.objects.create(user_id=request.user.id, model_house=house)
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH212', '', response.data)

    @detail_route(methods=['post'])
    def remove_user(self, request, *args, **kwargs):
        """
            POST:
                users: [int]
        """
        try:
            house = ModelHouse.objects.get(pk=kwargs['pk'])
        except Http404:
            return response_404('MH404')
        users = request.data.get('users')
        if users is not None:
            for user in users:
                try:
                    _user = ModelHouseUser.objects.filter(user_id=user, model_house=house)
                    _user.delete()
                except Exception:
                    pass
        response = super(ModelHouseViewSet, self).retrieve(request, *args, **kwargs)
        return response_200('MH213', '', response.data)


class OrderModelHouseViewSet(ModelViewSet):
    queryset = OrderModelHouse.objects.filter(is_active=settings.IS_ACTIVE).order_by("-updated")
    serializer_class = OrderModelHouseSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (IsAuthenticated, OrderMHViewadminPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = OrderModelHouse.objects.filter(is_active=settings.IS_ACTIVE).order_by("-updated")
        return super(OrderModelHouseViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OrderModelHouse.objects.filter(is_active=settings.IS_ACTIVE)
            orderModelObject = get_object_or_404(queryset, pk=pk)
            serializer = OrderModelHouseSerializer(orderModelObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OMH001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = OrderModelHouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                            created=datetime.now(), updated=datetime.now())
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OMH003.value, {}), status=status.HTTP_200_OK)
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OrderModelHouse.objects.all().filter(is_active=settings.IS_ACTIVE)
            orderModelObject = get_object_or_404(queryset, pk=pk)
            serializer = OrderModelHouseSerializer(orderModelObject, data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OMH005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH006.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH012.value, {}), status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OrderModelHouse.objects.all().filter(is_active=settings.IS_ACTIVE)
            orderModelObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OrderModelHouseSerializer(orderModelObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OMH007.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH013.value, {}), status=status.HTTP_404_NOT_FOUND)

    @list_route(methods=['GET'], pagination_class=LimitOffsetPagination)
    def selfGetlistBooking(self, request):
        self.queryset = OrderModelHouse.objects.all().filter(is_active=1, create_user_id=request.user.id).order_by("-updated")
        return super(OrderModelHouseViewSet, self).list(request)


class updateStatus(GenericAPIView, UpdateModelMixin):
    queryset = OrderModelHouse.objects.filter(is_active=settings.IS_ACTIVE)
    serializer_class = OrderModelHouseStatusSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk=None, *args, **kwargs):
        try:
            request.data['create_user_id'] = request.user.id
            queryset = OrderModelHouse.objects.all().filter(is_active=1)
            orderModelObject = get_object_or_404(queryset, pk=pk)
            serializer = OrderModelHouseSerializer(orderModelObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, OrderModelHouseSerializer(orderModelObject).data, MessageCode.OMH009.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH010.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OMH010.value, {}), status=status.HTTP_404_NOT_FOUND)
