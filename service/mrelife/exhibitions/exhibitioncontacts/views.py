import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mrelife.exhibitions.exhibitioncontacts.serializers import \
    ExhibitionContactSerializer
from mrelife.exhibitions.models import ExhibitionContact
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.exhibition_permission import ExhibitionContactPermission
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405


class ExhibitionContactViewSet(viewsets.ModelViewSet):

    queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExhibitionContactSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (ExhibitionContactPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(ExhibitionContactViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactSerializer(outletstoreObject)
            return  response_200(MessageCode.EXC001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EXC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXC002.value,{},{})

    def create(self, request):
        try:
            serializer = ExhibitionContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return  response_200(MessageCode.EXC003.value,{},serializer.data)
            return response_405(MessageCode.EXC010.value,serializer.errors,{}) 
        except Exception as e:
            return   response_400(MessageCode.EXC004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE)
            exhibitionCObjet = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactSerializer(exhibitionCObjet, data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id)
                return  response_200(MessageCode.EXC005.value,{},serializer.data)
            return response_405(MessageCode.EXC011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EXC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXC012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE)
            exhibitionCObjet = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionContactSerializer(exhibitionCObjet, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return  response_200(MessageCode.EXC007.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EXC009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXC013.value,{},{})
