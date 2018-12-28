"""
    Invoice
    Bin
"""
from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from rest_framework.decorators import detail_route
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from mrelife.invoices.models import Invoice
from mrelife.invoices.serializers import InvoiceSerializer
from mrelife.invoices.tasks import invoice_cal
from mrelife.utils.groups import GroupUser, IsStore
from mrelife.utils.relifepermissions import AdminOrStoreOrDenyPermission
from mrelife.utils.response import response_404
from url_filter.integrations.drf import DjangoFilterBackend


class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = (IsAuthenticated, AdminOrStoreOrDenyPermission)
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['created']

    def list(self, request, *args, **kwargs):
        current_month = datetime.now().month
        if IsStore(request.user):
            _queryset = Invoice.objects.filter(created__month=current_month).filter(outlet_store=request.user.store)
        else:
            _queryset = Invoice.objects.filter(created__month=current_month)
        for invoice in _queryset:
            invoice_cal(invoice)
            invoice.refresh_from_db()
        self.queryset = _queryset
        return super(InvoiceViewSet, self).list(request, *args, **kwargs)


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

    @detail_route(methods=['post'])
    def paid(self, request, *args, **kwargs):
        try:
            invoice = Invoice.objects.get(pk=kwargs.get("pk"))
            invoice.paid = True
            invoice.save()
        except ObjectDoesNotExist:
            return response_404('INV404')
