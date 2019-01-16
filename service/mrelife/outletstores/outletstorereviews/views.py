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

from mrelife.examplehouses.models import ExampleHouse
from mrelife.outletstores.models import OutletStore, OutletStoreReview
from mrelife.outletstores.outletstorereviews.serializers import \
    OutletStoreReviewSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStoreViewPermission
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.response import (response_200, response_400, response_404,
                                    response_405)


class OutletStoreReviewViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreReviewSerializer
    permission_classes = (OutletStoreViewPermission,)
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = OutletStoreReview.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(OutletStoreReviewViewSet, self).list(request)
        return response_200(MessageCode.DT003.value, {}, response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreReview.objects.filter(is_active=1).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreReviewSerializer(outletstoreObject)
            return response_200(MessageCode.OSR001.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.OSR009.value, {}, {})
        except Http404:
            return response_404(MessageCode.OSR002.value, {}, {})

    def create(self, request):
        serializer = OutletStoreReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(create_user_id=request.user.id, update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                            created=datetime.now(), updated=datetime.now())
            return response_200(MessageCode.OSR003.value, {}, serializer.data)
        return response_405(MessageCode.OSR010.value, serializer.errors, {})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            queryset = OutletStoreReview.objects.filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreReviewSerializer(outletstoreObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(update_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.OSR005.value, {}, serializer.data)
            return response_405(MessageCode.OSR011.value, serializer.errors, {})
        except KeyError:
            return response_400(MessageCode.OSR009.value, {}, {})
        except Http404:
            return response_404(MessageCode.OSR012.value, {}, {})
        except Exception as e:
            return response_400(MessageCode.OSR006.value, {}, {})

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
            return response_200(MessageCode.OSR008.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.OSR009.value, {}, {})
        except Http404:
            return response_404(MessageCode.OSR013.value, {}, {})
        except Exception as e:
            return response_400(MessageCode.OSR008.value, {}, {})

    @list_route(methods=['GET'], pagination_class=LimitOffsetPagination, url_path="getlistbyexamplehouse/(?P<example_house_id>[^/]+)")
    def getlistbyexamplehouse(self, request, example_house_id=None):
        self.queryset = []
        exampleHouseObject = ExampleHouse.objects.filter(id=example_house_id).only("store_id")
        if exampleHouseObject:
            self.queryset = OutletStoreReview.objects.filter(
                outlet_store__in=OutletStore.objects.filter(pk__in=exampleHouseObject))
        return super(OutletStoreReviewViewSet, self).list(request)
