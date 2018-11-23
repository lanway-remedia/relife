from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.events.models import Event, EventContact, EventContactReply
from mrelife.events.serializers import EventContactReplySerializer, EventContactSerializer, EventSerializer


class EventViewSet(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request):
        queryset = Event.objects.filter(is_active=1)
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Event.objects.all().filter(id=self.kwargs['pk'])
        serializer = EventSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = Event.objects.all()
        event_obj = get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(event_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
            return Response(output)

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

        return Response(status=status.HTTP_204_NO_CONTENT)
