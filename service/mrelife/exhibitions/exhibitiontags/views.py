import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from mrelife.events.models import EventExhibition
from mrelife.exhibitions.exhibitiontags.serializers import \
    ExhibitionTagSerializer
from mrelife.exhibitions.models import ExhibitionTag
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405
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
        return response_200('DT003', '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionTag.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionTagSerializer(outletstoreObject)
            return response_200(MessageCode.EXT001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EXT009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXT002.value,{},{})

    def create(self, request):
        try:
            serializer = ExhibitionTagSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EXT003.value,{},serializer.data)
            return response_405(MessageCode.EXT010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EXT002.value,serializer.errors,{})

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
                return response_200(MessageCode.EXT005.value,{},serializer.data)
            return response_405(MessageCode.EXT011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EXT009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXT012.value,{},{})

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
                return response_200(MessageCode.EXT008.value,{},serializer.data)
            return response_405(MessageCode.EXT009.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EXT009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXT013.value,{},{})
