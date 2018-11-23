from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreContactReply, OutletStoreMedia
from mrelife.outletstores.serializers import (
    OutletStoreContactReplySerializer,
    OutletStoreContactSerializer,
    OutletStoreMediaSerializer,
    OutletStoreSerializer
)
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode


class OutletStoreViewSet(viewsets.ModelViewSet):
    queryset = OutletStore.objects.all()
    serializer_class = OutletStoreSerializer

    def list(self, request):
        queryset = OutletStore.objects.filter(is_active=1)
        serializer = OutletStoreSerializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, pk=None):
        queryset = OutletStore.objects.filter(id=self.kwargs['pk']).filter(is_active=1)
        serializer = OutletStoreSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
       
        serializer = OutletStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        request.data['create_user_id'] = request.user.id
        queryset = OutletStore.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreSerializer(outletstoreObject, data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
            return Response(output, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def destroy(self, request, pk=None):
        queryset = OutletStore.objects.all()
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        data = {"is_active": settings.IS_INACTIVE}
        serializer = OutletStoreSerializer(outletstoreObject, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            outletContact = OutletStoreContact.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
            for item in outletContact:
                outletContact_reply = OutletStoreContactReply.objects.filter(
                    outlet_store_contact_id=item.id).filter(is_active=1)
                self.update_active(outletContact_reply)
            self.update_active(outletContact)
            outletMedia = OutletStoreMedia.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id)
            self.update_active(outletMedia)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # , permission_classes=[IsAuthenticated])
    @action(detail=True, methods=['post'], url_path='update_name', url_name='update_name')
    def update_name(self, request, pk=None):
        "update tilte to outletstore"
        queryset = OutletStore.objects.all().filter(is_active=1)
        outletstoreObject = get_object_or_404(queryset, pk=pk)
        serializer = OutletStoreSerializer(outletstoreObject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(updated=datetime.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutletStoreContactViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContact.objects.filter(is_active=1)
    serializer_class = OutletStoreContactSerializer

    def list(self, request):
        queryset = OutletStoreContact.objects.filter(is_active=1)
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
    queryset = OutletStoreContactReply.objects.filter(is_active=1)
    serializer_class = OutletStoreContactReplySerializer

    def list(self, request):
        queryset = OutletStoreContactReply.objects.filter(is_active=1)
        serializer = OutletStoreContactReplySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = OutletStoreContactReply.objects.all().filter(id=self.kwargs['pk'])
        serializer = OutletStoreContactReplySerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
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
    queryset = OutletStoreContact.objects.filter(is_active=1)
    serializer_class = OutletStoreContactSerializer

    def list(self, request):
        queryset = OutletStoreContact.objects.filter(is_active=1)
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
    queryset = OutletStoreMedia.objects.filter(is_active=1)
    serializer_class = OutletStoreMediaSerializer

    def list(self, request):
        queryset = OutletStoreMedia.objects.filter(is_active=1)
        serializer = OutletStoreMediaSerializer(queryset, many=True)
        return Response(serializer.data)

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
