from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from mrelife.events.models import Event
from mrelife.events.serializers import EventSerializer
from mrelife.commons.pagination import LargeResultsSetPagination


class EventViewSet(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = LargeResultsSetPagination
    
    
    def list(self, request):
        queryset = Event.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = EventSerializer(page, many=True)
            data={'status':status.HTTP_200_OK,'result':serializer.data}
            return self.get_paginated_response(data)
        serializer = EventSerializer(queryset, many=True)
        
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        queryset=Event.objects.all().filter(id=self.kwargs['pk'])
        serializer = EventSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01',"data":serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active = settings.IS_ACTIVE, created = datetime.now(), updated = datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors,"data":[]}
        return Response(output, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        queryset = Event.objects.all()
        event_obj= get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(event_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)   
        else:
            output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors,"data":[]}
            return Response(output)

    def destroy(self, request, pk=None):
        queryset = Event.objects.all()
        event_obj = get_object_or_404(queryset, pk=pk)
        event_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    