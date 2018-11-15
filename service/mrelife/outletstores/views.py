from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.outletstores.models import OutletStore
from mrelife.outletstores.serializers import OutletStoreSerializer


class OutletStoreViewSet(viewsets.ModelViewSet):
    queryset = OutletStore.objects.all()
    serializer_class = OutletStoreSerializer
    pagination_class = LargeResultsSetPagination

    def get_object(self, pk):
        try:
            return OutletStore.objects.get(pk=pk)
        except OutletStore.DoesNotExist:
            raise Http404

    def list(self, request):
        queryset = OutletStore.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = OutletStoreSerializer(page, many=True)
            data = {'status': status.HTTP_200_OK, 'result': serializer.data}
            return self.get_paginated_response(data)
        serializer = OutletStoreSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = OutletStore.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = OutletStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        outletstoreObject = OutletStore.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreSerializer(outletstoreObject, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        queryset = OutletStore.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        outletstoreObject.IS_ACTIVE = settings.IS_INACTIVE
        outletstoreObject.updated=datetime.now()
        outletstoreObject.save()
        return Response(status=status.HTTP_400_BAD_REQUEST)