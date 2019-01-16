import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405

from mrelife.events.eventmodelhouses.serializers import \
    EventModelHouseSerializer
from mrelife.events.models import Event, EventModelHouse
from mrelife.utils.event_permission import EventModelhousePermission
from mrelife.utils.groups import IsAdmin
from mrelife.utils.relifeenum import MessageCode


class EventModelhouseViewSet(viewsets.ModelViewSet):

    queryset = EventModelHouse.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventModelHouseSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventModelhousePermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = EventModelHouse.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(EventModelhouseViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventModelHouse.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventModelHouseSerializer(outletstoreObject)
            return response_200(MessageCode.EVMH001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC002.value,{},{})

    def create(self, request):
        try:
            serializer = EventModelHouseSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EVMH003.value,{},serializer.data)
            return response_405(MessageCode.EVMH004.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EVMH004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventModelHouse.objects.filter(is_active=settings.IS_ACTIVE)
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = EventModelHouseSerializer(event_obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return response_200(MessageCode.EVMH005.value,{},serializer.data)
            return response_405(MessageCode.EVMH010.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventModelHouse.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter()
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = EventModelHouseSerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return response_200(MessageCode.EVMH007.value,{},serializer.data)
            return response_405(MessageCode.EVMH008.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC013.value,{},{})