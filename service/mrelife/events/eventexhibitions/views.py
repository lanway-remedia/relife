import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405

from mrelife.events.eventexhibitions.serializers import EventExhibitionSerializer
from mrelife.events.models import EventExhibition
from mrelife.utils.event_permission import EventExhibitionPermission
from mrelife.utils.groups import IsAdmin
from mrelife.utils.relifeenum import MessageCode


class EventExhibitionViewSet(viewsets.ModelViewSet):

    queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventExhibitionSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventExhibitionPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'
    def list(self, request):

        self.queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(EventExhibitionViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventExhibitionSerializer(outletstoreObject)
            return response_200(MessageCode.EVE001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EVE009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVE002.value,{},{})

    def create(self, request):
        try:
            serializer = EventExhibitionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EVE003.value,{},serializer.data)
            return response_405(MessageCode.EVE010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EVE004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE)
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = EventExhibitionSerializer(event_obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return response_200(MessageCode.EVE005.value,{},serializer.data)
            return response_405(MessageCode.EVE011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVE009.value,{},{})
        except Http404:
            return response_404(MessageCode.EVE012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE)
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = EventExhibitionSerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return response_200(MessageCode.EVE007.value,{},serializer.data)
            return response_405(MessageCode.EVE008.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EVE009.value,{},{})
        except Http404:
            return  response_404(MessageCode.EVE013.value,{},{})