from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreMedia
from mrelife.outletstores.serializers import OutletStoreSerializer


class OutletStoreViewSet(viewsets.ModelViewSet):
    queryset = OutletStore.objects.filter(is_active=1)
    serializer_class = OutletStoreSerializer
    pagination_class = LargeResultsSetPagination

    """ def update_related_field(obj, value, field):
        # Collect all related objects.
        related_objs = CollectedObjects()
        obj._collect_sub_objects(related_objs)
        classes = related_objs.keys()
        # Bulk update the objects for performance
        for cls in classes:
            items = related_objs[cls].items()
            pk_list = [pk for pk, instance in items]
            cls._default_manager.filter(id__in=pk_list).update(**{field: value})
    """

    def get_object(self, pk):
        try:
            return OutletStore.objects.get(pk=pk)
        except OutletStore.DoesNotExist:
            raise Http404

    def list(self, request):
        queryset = OutletStore.objects.filter(is_active=1)
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
        queryset = OutletStore.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreSerializer(outletstoreObject, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStore.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreSerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            outletContact = OutletStoreContact.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
            self.update_active(outletContact)
            outletMedia = OutletStoreMedia.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
            self.update_active(outletMedia)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='update_name', url_name='update_name',permission_classes=[IsAuthenticated])
    def update_name(self, request, pk=None):
        "update tilte to outletstore"
        queryset = OutletStore.objects.all().filter(is_active=1)
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreSerializer(outletstoreObject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
