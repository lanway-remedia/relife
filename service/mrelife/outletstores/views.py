
from outletstores.models import OutletStore
from outletstores.serializers import OutletStoreSerializer, TagSerializer
from django.http import Http404
from rest_framework.views import APIView


from rest_framework.response import Response
from rest_framework import status

from datetime import datetime

from django.conf import settings
from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.outletstores.models import OutletStore
from mrelife.outletstores.response import ResultOutputResponse
from mrelife.outletstores.serializers import OutletStoreSerializer


class OutletStoreList(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    """
    List all snippets, or create a new snippet.
    """

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
            #raise Exception(ResultOutputResponse(serializer.data))
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

    def get_object(self, pk):
        try:
            return OutletStore.objects.get(pk=pk)
        except OutletStore.DoesNotExist:
            raise Http404

    @action(detail=False, methods=['put'])
    def custom_edit(self, request, pk=None):
        outletstore = self.get_object(pk)
        serializer = OutletStoreSerializer(outletstore, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """action(detail=False, methods=['post'])
    def add(self, request, *args, **kwargs):
        serializer = OutletStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors,"data":[]}
        return Response(output, status=status.HTTP_200_OK) """



    

