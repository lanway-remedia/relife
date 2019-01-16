import re
from datetime import datetime

from django.conf import settings
from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.decorators import action, list_route

from mrelife.attributes.models import Commitment, Contruction, Floor, HouseHoldIncome, HouseHoldSize, PriceRange, Style,SearchHistory
from mrelife.attributes.resources import (
    CommitmentResource,
    ContructionResource,
    FloorResource,
    HouseHoldIncomeResource,
    HouseHoldSizeResource,
    PriceRangeResource,
    StyleResource
)
from mrelife.attributes.serializers import (
    CommitmentSerializer,
    ContructionSerializer,
    FloorSerializer,
    HouseHoldIncomeSerializer,
    HouseHoldSizeSerializer,
    PriceRangeSerializer,
    StyleSerializer,
    SearchHistorySerializer
)
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405


class ContructionViewSet(viewsets.ModelViewSet):
    queryset = Contruction.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = ContructionSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a contruction attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a contruction attribute.
        """

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list contruction attributes.
        """
        queryset = Contruction.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a contruction attribute.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = Contruction.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export contruction attribute to csv.
        """
        resource = ContructionResource()
        queryset = Contruction.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="contructions.csv"'
        return response


class PriceRangeViewSet(viewsets.ModelViewSet):
    queryset = PriceRange.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = PriceRangeSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a price attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a price attribute
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list price attributes.
        """
        queryset = PriceRange.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a price attribute.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = PriceRange.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export price range attribute to csv.
        """
        resource = PriceRangeResource()
        queryset = PriceRange.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="priceranges.csv"'
        return response


class FloorViewSet(viewsets.ModelViewSet):
    queryset = Floor.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = FloorSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a floor attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a floor attribute.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list floor attributes
        """
        queryset = Floor.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a floor attribute.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = Floor.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export floor attribute to csv.
        """
        resource = FloorResource()
        queryset = Floor.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="floors.csv"'
        return response


class StyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = StyleSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a style attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a style attribute.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list style attributes
        """
        queryset = Style.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a style attribute.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = Style.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export style attribute to csv.
        """
        resource = StyleResource()
        queryset = Style.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="styles.csv"'
        return response


class HouseHoldIncomeViewSet(viewsets.ModelViewSet):
    queryset = HouseHoldIncome.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = HouseHoldIncomeSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a household_income attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a household_income attribute.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list household_income attributes.
        """
        queryset = HouseHoldIncome.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a household_income attribute.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = HouseHoldIncome.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export household_income attribute to csv.
        """
        resource = HouseHoldIncomeResource()
        queryset = HouseHoldIncome.objects.filter(is_active=settings.IS_ACTIVE).order_by('order')
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="household_incomes.csv"'
        return response


class HouseHoldSizeViewSet(viewsets.ModelViewSet):
    queryset = HouseHoldSize.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = HouseHoldSizeSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a household_size attribute.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, *args, **kwargs):
        """
        Update a household_size attribute.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, *args, **kwargs):
        """
        Get list household_size attributes
        """
        queryset = HouseHoldSize.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a household_size attribute
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = HouseHoldSize.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def retrieve(self, request, *args, **kwargs):
        """
        Get detail attribute
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export attribute household_size to csv.
        """
        resource = HouseHoldSizeResource()
        queryset = HouseHoldSize.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="household_sizes.csv"'
        return response


class CommitmentViewSet(viewsets.ModelViewSet):
    queryset = Commitment.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
    serializer_class = CommitmentSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request, *args, **kwargs):
        """
        Get list Commitment attributes
        """
        queryset = Commitment.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
        response = super(CommitmentViewSet, self).list(request)
        return response_200('', '', response.data)

    def create(self, request, *args, **kwargs):
        """
        Create a Commitment attribute.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return response_200(MessageCode.CM003.value, {}, serializer.data)
            return response_405(MessageCode.CM010.value, serializer.errors, {})
        except Exception as e:
            return response_400(MessageCode.CM004.value, {}, {})

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, pk=None, *args, **kwargs):
        """
        Update a Commitment attribute.
        """
        try:
            pk = kwargs['pk']
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            partial = kwargs.pop('partial', False)
            queryset = Commitment.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
            instance = get_object_or_404(queryset, pk=pk)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                self.perform_update(serializer)
                if getattr(instance, '_prefetched_objects_cache', None):
                    # If 'prefetch_related' has been applied to a queryset, we need to
                    # forcibly invalidate the prefetch cache on the instance.
                    instance._prefetched_objects_cache = {}

                return response_200(MessageCode.CM005.value, {}, serializer.data)
            return response_405(MessageCode.CM011.value, serializer.errors, {})
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM012.value, {}, {})

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def destroy(self, request, pk=None, *args, **kwargs):
        """
        Delete a Commitment attribute.
        """
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            instance = get_object_or_404(queryset, pk=pk)
            instance = self.get_object()
            instance.is_active = settings.IS_INACTIVE
            instance.save()
            queryset = Commitment.objects.filter(is_active=settings.IS_ACTIVE)
            serializer = self.get_serializer(queryset, many=True)
            return response_200(MessageCode.CM007.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM013.value, {}, {})
        except Exception as e:
            return response_200(MessageCode.CM008.value, {}, serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        """
        Get detail commitment
        """
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            partial = kwargs.pop('partial', False)
            queryset = Commitment.objects.all().filter(is_active=settings.IS_ACTIVE).order_by('order')
            instance = get_object_or_404(queryset, pk=pk)
            serializer = self.get_serializer(instance)
            return response_200(MessageCode.CM001.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM012.value, {}, {})

    def partial_update(self, request, *args, **kwargs):
        """
        Partial update attribute
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def export_csv(self, request, *args, **kwargs):
        """
        Export Commitment attribute to csv.
        """
        resource = CommitmentResource()
        queryset = Commitment.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="Commitments.csv"'
        return response
class SearchHistoryViewSet(viewsets.ModelViewSet):
    queryset = SearchHistory.objects.filter(is_active=settings.IS_ACTIVE)
    serializer_class = SearchHistorySerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request, *args, **kwargs):
        """
        Get list Search history attributes
        """
        queryset = SearchHistory.objects.filter(is_active=settings.IS_ACTIVE)
        response = super(SearchHistoryViewSet, self).list(request)
        return response_200('', '', response.data)

    def create(self, request, *args, **kwargs):
        """
        Create a Search history attribute.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(created=datetime.now(), updated=datetime.now())
                headers = self.get_success_headers(serializer.data)
                return response_200(MessageCode.CM003.value, {}, serializer.data)
            return response_405(MessageCode.CM010.value, serializer.errors, {})
        except Exception as e:
            return response_400(MessageCode.CM004.value, {}, {})
    def retrieve(self, request, pk=None, *args, **kwargs):
        """
        Get detail Search history
        """
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            partial = kwargs.pop('partial', False)
            queryset = SearchHistory.objects.all().filter(is_active=settings.IS_ACTIVE)
            instance = get_object_or_404(queryset, pk=pk)
            serializer = self.get_serializer(instance)
            return response_200(MessageCode.CM001.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM012.value, {}, {})
    def update(self, request, pk=None, *args, **kwargs):
        """
        Update a Search history attribute.
        """
        try:
            pk = kwargs['pk']
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            partial = kwargs.pop('partial', False)
            queryset = SearchHistory.objects.all().filter(is_active=settings.IS_ACTIVE)
            instance = get_object_or_404(queryset, pk=pk)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                if getattr(instance, '_prefetched_objects_cache', None):
                    # If 'prefetch_related' has been applied to a queryset, we need to
                    # forcibly invalidate the prefetch cache on the instance.
                    instance._prefetched_objects_cache = {}

                return response_200(MessageCode.CM005.value, {}, serializer.data)
            return response_405(MessageCode.CM011.value, serializer.errors, {})
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM012.value, {}, {})
        except Exception as e:
            return response_400(MessageCode.CM006.value, {}, {})

    def destroy(self, request, pk=None, *args, **kwargs):
        """
        Delete a Search history attribute.
        """
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            instance = get_object_or_404(queryset, pk=pk)
            instance = self.get_object()
            instance.is_active = settings.IS_INACTIVE
            instance.save()
            queryset = SearchHistory.objects.filter(is_active=settings.IS_ACTIVE)
            serializer = self.get_serializer(queryset, many=True)
            return response_200(MessageCode.CM007.value, {}, serializer.data)
        except KeyError:
            return response_400(MessageCode.CM009.value, {}, {})
        except Http404:
            return response_404(MessageCode.CM013.value, {}, {})
        except Exception as e:
            return response_200(MessageCode.CM008.value, {}, serializer.data)

    @list_route(methods=['GET'], pagination_class=LimitOffsetPagination, url_path="get_most_keyword/(?P<number_keyword>[^/]+)")
    def get_most_keyword(self, request,number_keyword=None):
        """
        Get most searched keyword
        """
        a=int(number_keyword)
        self.queryset = SearchHistory.objects.filter(is_active=settings.IS_ACTIVE).order_by('-num_result')[:a]
        response = super(SearchHistoryViewSet, self).list(request)
        return response_200('', '', response.data)