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
from mrelife.events.models import Event, EventContact, EventContactReply
from mrelife.events.serializers import EventContactReplySerializer, EventContactSerializer, EventSerializer
from mrelife.utils.relifeenum import MessageCode


class EventViewSet(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request):
        self.queryset = Event.objects.filter(is_active=1).filter(is_active=1).order_by("-created")
        return super(EventViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            queryset = Event.objects.all().filter(is_active=1).filter(is_active=1).order_by("-created")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV002.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV003.value, ""), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        request.data['create_user_id'] = request.user.id
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV004.value, ""), status=status.HTTP_201_CREATED)
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV005.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        request.data['create_user_id'] = request.user.id
        queryset = Event.objects.all()
        event_obj = get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(event_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV006.value, ""), status=status.HTTP_200_OK)
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV007.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        queryset = Event.objects.all()
        event_obj = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = EventSerializer(event_obj, data=data, partial=True)
        if(serializer.is_valid()):
            serializer.save(updated=datetime.now())
            eventContactObject = EventContact.objects.filter(
                is_active=1, event_id=pk)
            if(eventContactObject):
                CommonFuntion.update_active(eventContactObject)
                for item in eventContactObject:
                    eventContactReplyObject = EventContactReply.objects.filter(
                        is_active=1, event_contact_reply=eventContactObject.id)
                    if(eventContactReplyObject):
                        CommonFuntion.update_active(eventContactReplyObject)

            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV008.value, ""), status=status.HTTP_200_NO_CONTENT)
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV009.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
