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
from mrelife.utils.response import (response_200)

from mrelife.commons.common_fnc import CommonFuntion
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
        return response_200('', '', response.data)

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
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVCR001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = EventContactReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=1, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVCR003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR004.value, {}), status=status.HTTP_400_BAD_REQUEST)

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
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVCR005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR012.value, {}), status=status.HTTP_404_NOT_FOUND)

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
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVCR007.value, ""), status=status.HTTP_200_NO_CONTENT)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR008.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVCR013.value, {}), status=status.HTTP_404_NOT_FOUND)
