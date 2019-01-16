from datetime import datetime
import re

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

from mrelife.events.eventcontacts.serializers import EventContactSerializer
from mrelife.events.models import Event, EventContact
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.groups import IsAdmin
from mrelife.utils.event_permission import EventContactPermission


class EventContactViewSet(viewsets.ModelViewSet):

    queryset = EventContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventContactSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventContactPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = EventContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        if not IsAdmin(request.user):
                self.queryset = self.queryset.filter(create_user_id=request.user.id)
        response = super(EventContactViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContact.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventContactSerializer(outletstoreObject)
            return response_200(MessageCode.EVC001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC002.value,{},{})
    def create(self, request):
        try:
            serializer = EventContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=1, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EVC003.value,{},serializer.data)
            return response_405(MessageCode.EVC010.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Exception as e:
            return response_400(MessageCode.EVC004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContact.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = EventContactSerializer(event_obj, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id)
                return response_200(MessageCode.EVC005.value,{},serializer.data)
            return response_405(MessageCode.EVC011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContact.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = EventContactSerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return response_200(MessageCode.EVC007.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EVC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVC013.value,{},{})
