from django.http import Http404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from mrelife.invoices.models import Invoice
from mrelife.invoices.serializers import InvoiceSerializer
from mrelife.utils.response import response_404


class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).list(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')

    def retrieve(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).retrieve(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')

    def create(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).create(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')

    def update(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).update(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')

    def partial_update(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).partial_update(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')

    def destroy(self, request, *args, **kwargs):
        try:
            return super(InvoiceViewSet, self).destroy(request, *args, **kwargs)
        except Http404:
            return response_404('INV404')
