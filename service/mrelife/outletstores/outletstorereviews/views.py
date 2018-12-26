import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import (action, detail_route, list_route,
                                       permission_classes)
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.examplehouses.models import ExampleHouse
from mrelife.outletstores.models import OutletStore, OutletStoreReview
from mrelife.outletstores.outletstorereviews.serializers import OutletStoreReviewSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStoreViewPermission
from mrelife.utils.relifeenum import MessageCode


class OutletStoreReviewViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreReviewSerializer
    #permission_classes = (OutletStoreViewPermission,)
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = OutletStoreReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(OutletStoreReviewViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreReview.objects.filter(is_active=1).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreReviewSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSR001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR002.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            serializer = OutletStoreReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id,update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSR003.value, {}), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR004.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            queryset = OutletStoreReview.objects.all().filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreReviewSerializer(outletstoreObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSR005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR006.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR006.value, {}),  status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            queryset = OutletStoreReview.objects.filter(is_active=settings.Is_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreReviewSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, updated=datetime.now())
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR008.value, serializer.errors), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSR008.value, {}), status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['GET'], pagination_class=LimitOffsetPagination, url_path="getlistbyexamplehouse/(?P<example_house_id>[^/]+)")
    def getlistbyexamplehouse(self, request, example_house_id=None):
        self.queryset = []
        exampleHouseObject = ExampleHouse.objects.filter(id=example_house_id).only("store_id")
        if exampleHouseObject:
            self.queryset = OutletStoreReview.objects.filter(
                outlet_store__in=OutletStore.objects.filter(pk__in=exampleHouseObject))
        return super(OutletStoreReviewViewSet, self).list(request)
