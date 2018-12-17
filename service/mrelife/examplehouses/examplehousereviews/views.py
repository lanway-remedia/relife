import re
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
from mrelife.examplehouses.models import ExampleHouse,ExampleHouseReview
from mrelife.examplehouses.examplehousereviews.serializers import ExampleHouseReviewSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
# from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.relifeenum import MessageCode


class ExampleHouseReviewViewSet(viewsets.ModelViewSet):
    queryset = ExampleHouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExampleHouseReviewSerializer
    # permission_classes = (IsAuthenticated, OutletStorePermission,)
    pagination_class = LimitOffsetPagination

    def list(self, request):
        self.queryset = ExampleHouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(ExampleHouseReviewViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            # rex = re.compile("^[0-9]$")
            # if not rex.match(pk):
            #     return Response(CommonFuntion.resultResponse(False, "",  MessageCode.OSC004.value, ""), status=status.HTTP_400_BAD_REQUEST)
            queryset = ExampleHouseReview.objects.all().filter(is_active=1).filter(is_active=1).order_by("-updated")
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ExampleHouseReviewSerializer(modelhouseObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR001.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR002.value, ""), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = ExampleHouseReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR003.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR004.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        # rex = re.compile("^[0-9]$")
        # if not rex.match(pk):
        #     return Response(CommonFuntion.resultResponse(False, "",  MessageCode.OSC004.value, ""), status=status.HTTP_400_BAD_REQUEST)
        try:
            queryset = ExampleHouseReview.objects.all().filter(is_active=1)
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ExampleHouseReviewSerializer(modelhouseObject, data=request.data)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EHR005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR006.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR006.value, ""),  status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            queryset = ExampleHouseReview.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExampleHouseReviewSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, updated=datetime.now())
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR008.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR008.value, ""), status=status.HTTP_400_BAD_REQUEST)
