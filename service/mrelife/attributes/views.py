from rest_framework.response import Response
from rest_framework import viewsets
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils import result
from datetime import datetime
from django.conf import settings
from mrelife.attributes.models import Contruction, PriceRange, Floor, Style, HouseHoldIncome, HouseHoldSize
from mrelife.attributes.serializers import ContructionSerializer, PriceRangeSerializer, FloorSerializer, StyleSerializer, HouseHoldIncomeSerializer, HouseHoldSizeSerializer
from mrelife.attributes.resources import ContructionResource, PriceRangeResource, FloorResource, StyleResource, CommitmentResource, HouseHoldSizeResource, HouseHoldIncomeResource
from django.http import HttpResponse


class ContructionViewSet(viewsets.ModelViewSet):
    queryset = Contruction.objects.all()
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
        queryset = Contruction.objects.filter(is_active=settings.IS_ACTIVE)

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
    queryset = PriceRange.objects.all()
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
        queryset = PriceRange.objects.filter(is_active=settings.IS_ACTIVE)

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
    queryset = Floor.objects.all()
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
        queryset = Floor.objects.filter(is_active=settings.IS_ACTIVE)

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
    queryset = Style.objects.all()
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
        queryset = Style.objects.filter(is_active=settings.IS_ACTIVE)

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
    queryset = HouseHoldIncome.objects.all()
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
        queryset = HouseHoldIncome.objects.filter(is_active=settings.IS_ACTIVE)

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
        queryset = HouseHoldIncome.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="household_incomes.csv"'
        return response


class HouseHoldSizeViewSet(viewsets.ModelViewSet):
    queryset = HouseHoldSize.objects.all()
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
        queryset = HouseHoldSize.objects.filter(is_active=settings.IS_ACTIVE)

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
