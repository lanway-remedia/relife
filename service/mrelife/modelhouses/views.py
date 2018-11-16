from datetime import datetime

from django.conf import settings
from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response

from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.modelhouses.models import ModelHouse
from mrelife.modelhouses.serializers import ModelHouseSerializer

class ModelHouseViewSet(viewsets.ModelViewSet):
    queryset = ModelHouse.objects.all()
    serializer_class = ModelHouseSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request):
        queryset = ModelHouse.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ModelHouseSerializer(page, many=True)
            data = {'status': status.HTTP_200_OK, 'result': serializer.data}
            return self.get_paginated_response(data)
        serializer = ModelHouseSerializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ModelHouse.objects.all().filter(id=self.kwargs['pk'])
        serializer = ModelHouseSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = ModelHouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = ModelHouse.objects.all()
        modernhouse = get_object_or_404(queryset, pk=pk)
        serializer = ModelHouseSerializer(modernhouse, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
            return Response(output)

    def destroy(self, request, pk=None):
        queryset = ModelHouse.objects.all()
        modernhouse = get_object_or_404(queryset, pk=pk)
        modernhouse.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
