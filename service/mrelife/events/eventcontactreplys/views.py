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

from mrelife.events.eventcontactreplys.serializers import \
    EventContactReplySerializer
from mrelife.events.models import Event, EventContactReply
from mrelife.utils.event_permission import EventContactPermission
from mrelife.utils.groups import IsAdmin
from mrelife.utils.relifeenum import MessageCode


class EventContactReplyViewSet(viewsets.ModelViewSet):

    queryset = EventContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventContactReplySerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventContactPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = EventContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        if not IsAdmin(request.user):
            self.queryset = self.queryset.filter(create_user_id=request.user.id)
        response = super(EventContactReplyViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContactReply.objects.filter(is_acitve=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventContactReplySerializer(outletstoreObject)
            return response_200(MessageCode.EVCR001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EVCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVCR002.value,{},{})

    def create(self, request):
        try:
            serializer = EventContactReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=1, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EVCR003.value,{},serializer.data)
            return response_405(MessageCode.EVCR010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EVCR004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContactReply.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = EventContactReplySerializer(event_obj, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id)
                return response_200(MessageCode.EVCR005.value,{},serializer.data)
            return response_405(MessageCode.EVCR011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVCR012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventContactReply.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = EventContactReplySerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return response_200(MessageCode.EVCR007.value,{},serializer.data)
            return response_405(MessageCode.EVCR008.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVCR013.value,{},{})
