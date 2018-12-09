from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.outletstores.models import OutletStoreMedia
from mrelife.outletstores.outletstoremedias.serializers import OutletStoreMediaSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
# from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.relifeenum import MessageCode


class OutletStoreMediaViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreMedia.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreMediaSerializer
    # permission_classes = (IsAuthenticated, OutletStorePermission,)
    pagination_class = LimitOffsetPagination

    def list(self, request):
        self.queryset = OutletStoreMedia.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(OutletStoreMediaViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            queryset = OutletStoreMedia.objects.all().filter(is_active=1).filter(is_active=1).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreMediaSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSM001.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM002.value, ""), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = OutletStoreMediaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSM003.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM004.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            queryset = OutletStoreMedia.objects.all().filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreMediaSerializer(outletstoreObject, data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSM005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM006.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM006.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            queryset = OutletStoreMedia.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreMediaSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSM007.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM008.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSM008.value, ""), status=status.HTTP_400_BAD_REQUEST)
