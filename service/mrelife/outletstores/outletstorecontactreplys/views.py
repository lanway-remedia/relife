from datetime import datetime
import re

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
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.outletstores.models import OutletStoreContactReply
from mrelife.outletstores.outletstorecontactreplys.serializers import OutletStoreContactReplySerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStoreContactPermission
from mrelife.utils.relifeenum import MessageCode


class OutletStoreContactReplyViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreContactReplySerializer
    permission_classes = (OutletStoreContactPermission,)
    pagination_class = LimitOffsetPagination

    def list(self, request):
        self.queryset = OutletStoreContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        if not IsAdmin(request.user):
            self.queryset = self.queryset.filter(create_user_id=request.user.id)
        return super(OutletStoreContactReplyViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContactReply.objects.filter(is_active=1).order_by("-updated")
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreContactReplySerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSCR001.value, ""), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR009.value, "Invalid ID supplied"), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR002.value, ""), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR002.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            serializer = OutletStoreContactReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user_id=1, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSCR003.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR004.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR004.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContactReply.objects.filter(is_active=1)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreContactReplySerializer(outletstoreObject, data=request.data)
            if serializer.is_valid():
                serializer.save(user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSCR005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR006.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR009.value, "Invalid ID supplied"), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR002.value, ""), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR006.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContactReply.objects.filter(is_active=1)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreContactReplySerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSCR007.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR008.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR009.value, "Invalid ID supplied"), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR002.value, ""), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSCR008.value, ""), status=status.HTTP_400_BAD_REQUEST)
