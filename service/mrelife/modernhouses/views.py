from modernhouses.models import ModernHouse
from modernhouses.serializers import ModernHouseSerializer
from django.http import Http404
from rest_framework.views import APIView

from outletstores.response import ResultOutputResponse
from commons.pagination import LargeResultsSetPagination
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
            return self.get_paginated_response(serializer.data)
        serializer = ModernHouseSerializer(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self,request,pk=None):
        queryset=ModernHouse.objects.all().filter(id=self.kwargs['pk'])
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ModernHouseSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ModernHouseSerializer(queryset, many=True)
    