import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action, list_route, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mrelife.utils.response import (response_200)
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.examplehouses.examplehousereviews.serializers import ExampleHouseReviewSerializer
from mrelife.examplehouses.models import ExampleHouse, ExampleHouseReview
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.relifeenum import MessageCode


class ExampleHouseReviewViewSet(viewsets.ModelViewSet):
    queryset = ExampleHouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExampleHouseReviewSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'


    def list(self, request):
        self.queryset = ExampleHouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(ExampleHouseReviewViewSet, self).list(request)
        return response_200('', '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExampleHouseReview.objects.all().filter(is_active=1).filter(is_active=1).order_by("-updated")
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ExampleHouseReviewSerializer(modelhouseObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR001.value, ""), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = ExampleHouseReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR003.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR004.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExampleHouseReview.objects.all().filter(is_active=1)
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ExampleHouseReviewSerializer(modelhouseObject, data=request.data)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR012.value, {}), status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExampleHouseReview.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExampleHouseReviewSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, updated=datetime.now())
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR008.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR013.value, {}), status=status.HTTP_404_NOT_FOUND)
    
    
    
    @list_route(methods=['GET'], pagination_class=LimitOffsetPagination,url_path="getlistbyexamplehouse/(?P<example_house_id>[^/]+)")
    def getlistbyexamplehouse(self, request, example_house_id=None):
        try:
            self.queryset=[]
            self.queryset = ExampleHouseReview.objects.filter(
                example_house_id=example_house_id)
            response = super(ExampleHouseReviewViewSet, self).list(request)
            return response_200('', '', response.data)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR002.value, ""), status=status.HTTP_404_NOT_FOUND)
