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
from mrelife.exhibitions.exhibitiontags.serializers import ExhibitionTagSerializer
from mrelife.exhibitions.models import ExhibitionTag
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode


class EhibitionTagViewSet(viewsets.ModelViewSet):

    queryset = ExhibitionTag.objects.all()
    serializer_class = ExhibitionTagSerializer
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        self.queryset = ExhibitionTag.objects.all().filter(is_active=1)
        return super(EhibitionTagViewSet, self).list(request, *args, **kwargs)

    def retrieve(self, request, pk=None):
        try:
            queryset = ExhibitionTag.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionTagSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT002.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT003.value, ""), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = ExhibitionTagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT004.value, ""), status=status.HTTP_201_CREATED)
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT005.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            queryset = ExhibitionTag.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionTagSerializer(event_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT006.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT007.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT003.value, ""), status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            queryset = ExhibitionTag.objects.all()
            exhibitionObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionTagSerializer(exhibitionObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EXT008.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT009.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EXT003.value, ""), status=status.HTTP_404_NOT_FOUND)
