from datetime import datetime

from django.conf import settings
from django.http import Http404
from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.outletstores.models import OutletStore
from mrelife.outletstores.serializers import OutletStoreSerializer
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class OutletStoreList(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    # List all snippets, or create a new snippet.
    def get(self, request, format=None):
        outletstores = OutletStore.objects.all()
        serializer = OutletStoreSerializer(outletstores, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "messageParams": {"name": "Toyota"}, "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)


class OutletStoreCreate(APIView):
    """
    Create a outlet store.
    """

    def post(self, request, format=None):
        serializer = OutletStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)


class OutletStoreUpdate(APIView):
    """
    Update a outlet store.
    """

    def get_object(self, pk):
        try:
            return OutletStore.objects.get(pk=pk)
        except OutletStore.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        outletstore = self.get_object(pk)
        serializer = OutletStoreSerializer(outletstore, data=request.data)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())

            # return Response(serializer.data)
            # raise Exception(ResultOutputResponse(serializer.data))
            return Response(serializer.data)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output)


class OutletStoreDelete(APIView):
    """
    Delete a outlet store.
    """

    def get_object(self, pk):
        try:
            return OutletStore.objects.get(pk=pk)
        except OutletStore.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        outletstore = self.get_object(pk)
        outletstore.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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

    @action(detail=False, methods=['put'])
    def custom_edit(self, request, pk=None):
        outletstore = self.get_object(pk)
        serializer = OutletStoreSerializer(outletstore, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def add(self, request, *args, **kwargs):
        serializer = OutletStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}

        return Response(output, status=status.HTTP_200_OK)
