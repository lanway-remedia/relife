import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.events.models import EventExhibition
from mrelife.exhibitions.exhibitiontags.serializers import \
    ExhibitionTagSerializer
from mrelife.exhibitions.models import ExhibitionTag
from mrelife.utils.response import (response_200)
from mrelife.utils import result
from mrelife.utils.exhibition_permission import ExhibitionPermission
from mrelife.utils.relifeenum import MessageCode


class ExhibitionTagViewSet(viewsets.ModelViewSet):

    queryset = ExhibitionTag.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExhibitionTagSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (ExhibitionPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request, *args, **kwargs):
        self.queryset = ExhibitionTag.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(ExhibitionTagViewSet, self).list(request, *args, **kwargs)
        return response_200('', '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionTag.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionTagSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = ExhibitionTagSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT002.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionTag.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionTagSerializer(event_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT012.value, {}), status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionTag.objects.all()
            exhibitionObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionTagSerializer(exhibitionObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT008.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT009.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT013.value, {}), status=status.HTTP_404_NOT_FOUND)
