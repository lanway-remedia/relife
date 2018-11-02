from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from outletstore.models import OutletStore
from outletstore.serializers import OutletStoreSerializer
from rest_framework import generics
from rest_framework import viewsets
from outletstore.pagination import LargeResultsSetPagination
from rest_framework.response import Response

class OutletStoreViewsets(viewsets.GenericViewSet):

    pagination_class = LargeResultsSetPagination
    def list(self, request):
        queryset = OutletStore.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = OutletStoreSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = OutletStoreSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        queryset=""
        return queryset
    def retrieve(self,request,pk=None):
        queryset=OutletStore.objects.all().filter(id=self.kwargs['pk'])
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = OutletStoreSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = OutletStoreSerializer(queryset, many=True)

    def update(self, request, pk=None):
        qureyset=""
        return qureyset

    def partial_update(self, request, pk=None):
        qureyset=""
        return qureyset

    def destroy(self, request, pk=None):
        qureyset=""
        return qureyset