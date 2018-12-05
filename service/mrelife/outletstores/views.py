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
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.outletstores.models import (OutletStore, OutletStoreContact,
                                         OutletStoreContactReply,
                                         OutletStoreMedia)
from mrelife.outletstores.serializers import (OutletStoreContactReplySerializer,
                                              OutletStoreContactSerializer,
                                              OutletStoreMediaSerializer,
                                              OutletStoreSerializer)
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.relifeenum import MessageCode


class OutletStoreViewSet(viewsets.ModelViewSet):
    queryset = OutletStore.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreSerializer
    permission_classes = (IsAuthenticated, OutletStorePermission,)
    pagination_class = LimitOffsetPagination

    def list(self, request):
        self.queryset = OutletStore.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(OutletStoreViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            queryset = OutletStore.objects.all().filter(is_active=1).filter(is_active=1).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OT002.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT003.value, ""), status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = OutletStoreSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OT004.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT005.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT005.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            queryset = OutletStore.objects.all().filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreSerializer(outletstoreObject, data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OT006.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT007.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT007.value, ""), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            queryset = OutletStore.objects.all().filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                outletContact = OutletStoreContact.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
                for item in outletContact:
                    outletContact_reply = OutletStoreContactReply.objects.filter(
                        outlet_store_contact_id=item.id).filter(is_active=1)
                    if(outletContact_reply):
                        CommonFuntion.update_active(outletContact_reply)
                        CommonFuntion.update_active(outletContact)
                outletMedia = OutletStoreMedia.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
                CommonFuntion.update_active(outletMedia)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OT008.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT009.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OT009.value, ""), status=status.HTTP_400_BAD_REQUEST)


class OutletStoreContactViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreContactSerializer

    def list(self, request):
        queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        serializer = OutletStoreContactSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = OutletStoreContact.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreContactSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):

        serializer = OutletStoreContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = OutletStoreContact.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreContactSerializer(outletstoreObject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStoreContact.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreContactSerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            outletContactreply = OutletStoreContactReply.objects.filter(
                is_active=1, outlet_store_contact_id=outletstoreObject.id)
            self.update_active(outletContactreply)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutletStoreContactReplyViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreContactReplySerializer

    def list(self, request):
        queryset = OutletStoreContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        serializer = OutletStoreContactReplySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            queryset = OutletStoreContactReply.get(id=self.kwargs['pk'])
            serializer = OutletStoreContactReplySerializer(queryset)
            output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
            return Response(output, status=status.HTTP_200_OK)
        except Exception as e:
            output = {"status": False, 'messageCode': 'MSG01', "data": []}
            return Response(output, status=status.HTTP_200_OK)

    def create(self, request):

        serializer = OutletStoreContactReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = OutletStoreContactReply.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreContactReplySerializer(outletstoreObject, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStoreContactReply.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreContactReplySerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutletStoreContactViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreContactSerializer

    def list(self, request):
        queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        serializer = OutletStoreContactSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = OutletStoreContact.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreContactSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):

        serializer = OutletStoreContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = OutletStoreContact.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreContactSerializer(outletstoreObject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStoreContact.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreContactSerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            outletContactreply = OutletStoreContactReply.objects.filter(
                is_active=1, outlet_store_contact_id=outletstoreObject.id)
            self.update_active(outletContactreply)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutletStoreMediaViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreMedia.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreMediaSerializer

    def list(self, request):
        self.queryset = OutletStoreMedia.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        super(OutletStoreMediaViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        queryset = OutletStoreMedia.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreMediaSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):

        serializer = OutletStoreMediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = OutletStoreMedia.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreMediaSerializer(outletstoreObject, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStoreMedia.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreMediaSerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
