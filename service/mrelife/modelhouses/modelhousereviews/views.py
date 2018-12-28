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
from mrelife.modelhouses.models import ModelHouse,ModelhouseReview
from mrelife.modelhouses.modelhousereviews.serializers import ModelHouseReviewSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
# from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.relifeenum import MessageCode


class ModelHouseReviewViewSet(viewsets.ModelViewSet):
    queryset = ModelhouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ModelHouseReviewSerializer
    # permission_classes = (IsAuthenticated, OutletStorePermission,)
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = ModelhouseReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(ModelHouseReviewViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ModelhouseReview.objects.all().filter(is_active=1).filter(is_active=1).order_by("-updated")
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ModelHouseReviewSerializer(modelhouseObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.MHR001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR002.value, {}), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = ModelHouseReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.MHR003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR004.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ModelhouseReview.objects.all().filter(is_active=1)
            modelhouseObject = get_object_or_404(queryset, pk=pk)
            serializer = ModelHouseReviewSerializer(modelhouseObject, data=request.data)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.MHR005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR012.value, {}),  status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            queryset = ModelhouseReview.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ModelHouseReviewSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user=request.user.id, updated=datetime.now())
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR008.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EHR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.MHR013.value, {}), status=status.HTTP_404_NOT_FOUND)
