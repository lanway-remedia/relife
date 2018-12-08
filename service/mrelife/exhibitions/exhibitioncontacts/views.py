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

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.exhibitions.exhibitioncontacts.serializers import ExhibitionContactSerializer
from mrelife.exhibitions.models import ExhibitionContact
from mrelife.utils.relifeenum import MessageCode


class ExhibitionContactViewSet(viewsets.ModelViewSet):

    queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExhibitionContactSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        self.queryset = ExhibitionContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(ExhibitionContactViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            queryset = ExhibitionContact.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVMH001.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH002.value, e), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = ExhibitionContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVMH003.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH004.value, e), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            queryset = ExhibitionContact.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactSerializer(event_obj, data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVMH005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH006.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH006.value, e), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            queryset = ExhibitionContact.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionContactSerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EVMH007.value, ""), status=status.HTTP_200_NO_CONTENT)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH008.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EVMH008.value, e), status=status.HTTP_400_BAD_REQUEST)
