from mrelife.modernhouses.models import ModernHouse
from mrelife.modernhouses.serializers import ModernHouseSerializer
from django.http import Http404
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from mrelife.outletstores.response import ResultOutputResponse
from mrelife.commons.pagination import LargeResultsSetPagination
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class ModernHouseViewSet(viewsets.ModelViewSet):
    queryset = ModernHouse.objects.all()
    serializer_class = ModernHouseSerializer
    pagination_class = LargeResultsSetPagination
    
    def list(self, request):
        queryset = ModernHouse.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ModernHouseSerializer(page, many=True)
            data={'status':status.HTTP_200_OK,'data':serializer.data}
            return self.get_paginated_response(data)
        serializer = ModernHouseSerializer(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self,request,pk=None):
        queryset=ModernHouse.objects.all().filter(id=self.kwargs['pk'])
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ModernHouseSerializer(page, many=True)
            data={'status':status.HTTP_200_OK,'data':serializer.data}
            return self.get_paginated_response(data)
        serializer = ModernHouseSerializer(queryset, many=True)
    def create(self, request):
        serializer = ModernHouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active = settings.IS_ACTIVE, created = datetime.now(), updated = datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors,"data":[]}
        return Response(output, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        queryset = ModernHouse.objects.all()
        modernhouse= get_object_or_404(queryset, pk=pk)
        serializer = ModernHouseSerializer(modernhouse, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)   
        else:
            output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors,"data":[]}
            return Response(output)
    def destroy(self, request, pk=None):
        queryset = ModernHouse.objects.all()
        modernhouse = get_object_or_404(queryset, pk=pk)
        modernhouse.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    