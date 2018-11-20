from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.commons.pagination import LargeResultsSetPagination
from mrelife.exhibitions.models import Exhibition
from mrelife.exhibitions.serializers import ExhibitionSerializer


class EhibitionViewSet(viewsets.ModelViewSet):

    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request):
        queryset = Exhibition.objects.filter(is_active=1)
        serializer = ExhibitionSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Exhibition.objects.all().filter(id=self.kwargs['pk'])
        serializer = ExhibitionSerializer(queryset, many=True)
        output = {"status": True, 'messageCode': 'MSG01', "data": serializer.data}
        return Response(output, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = ExhibitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            return Response(serializer.data, status=status.HTTP_200_OK)
        output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
        return Response(output, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        queryset = Exhibition.objects.all()
        event_obj = get_object_or_404(queryset, pk=pk)
        serializer = ExhibitionSerializer(event_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            output = {"status": False, 'messageCode': 'MSG01', "errors": serializer.errors, "data": []}
            return Response(output)

    def destroy(self, request, pk=None):
        queryset = Exhibition.objects.all().filter(is_active=1, pk=pk)
        event_obj = get_object_or_404(queryset, pk=pk)
        CommonFuntion.update_active(queryset)
        return Response(status=status.HTTP_204_NO_CONTENT)
