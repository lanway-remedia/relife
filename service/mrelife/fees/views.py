from django.http import Http404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from mrelife.fees.models import Fee
from mrelife.fees.serializers import FeeSerializer
from mrelife.utils.relifepermissions import AdminPermission
from mrelife.utils.response import response_404


class FeeViewSet(ModelViewSet):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = (IsAuthenticated, AdminPermission)
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).list(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')

    def retrieve(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).retrieve(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')

    def create(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).create(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')

    def update(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).update(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')

    def partial_update(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).partial_update(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')

    def destroy(self, request, *args, **kwargs):
        try:
            return super(FeeViewSet, self).destroy(request, *args, **kwargs)
        except Http404:
            return response_404('FEE404')
