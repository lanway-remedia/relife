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

from mrelife.commons.common_fnc import CommonFuntion
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
        return super(EventExhibitionViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = EventExhibition.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventExhibitionSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVE001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = EventExhibitionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVE003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE004.value, {}), status=status.HTTP_400_BAD_REQUEST)

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
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVE005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE012.value, {}), status=status.HTTP_404_NOT_FOUND)

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
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVE007.value, {}), status=status.HTTP_200_NO_CONTENT)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE008.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVE013.value, {}), status=status.HTTP_404_NOT_FOUND)
