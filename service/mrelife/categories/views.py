from datetime import datetime
from django.conf import settings
from mrelife.categories.models import Category, SubCategory
from mrelife.categories.serializers import CategorySerializer, SubCategorySerializer
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers
from django.core.exceptions import ValidationError
from rest_framework.decorators import action
import csv
from django.http import HttpResponse


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=settings.IS_ACTIVE)
    serializer_class = CategorySerializer

    def create(self, request, type=None):
        """
        Create new a Category.
        type = 1: add new Category.
        type = 2: add new Sub Category.
        """
        # type = request.data.get('type')
        if(type is None or int(type) not in [settings.SUB_CATEGORY, settings.ROOT_CATEGORY]):

            return Response(result.resultResponse(False, ValidationError("Type category is required"), MessageCode.FA001.value))
        if (int(type) == settings.SUB_CATEGORY):
            serializer = SubCategorySerializer(data=request.data)
        else:
            serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)

            serializer = self.get_serializer(self.queryset, many=True)  # return list all Category
            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, pk=None, type=None, *args, **kwargs):
        """
        Update a Category.
        type = 1: update Category.
        type = 2: update Sub Category.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        # type = request.data.get('type')
        if(type is None or int(type) not in [settings.SUB_CATEGORY, settings.ROOT_CATEGORY]):
            return Response(result.resultResponse(False, ValidationError("Type category is required"), MessageCode.FA001.value))
        if (int(type) == settings.SUB_CATEGORY):
            subCat = SubCategory.objects.get(pk=pk)
            serializer = SubCategorySerializer(subCat, data=request.data, partial=partial)
        else:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            serializer = self.get_serializer(self.queryset, many=True)  # return list all Category
            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, type=None, *args, **kwargs):
        """
        Get list Category.
        type = 1: get data Category.
        type = 2: get data Sub Category.
        """
        # type = request.query_params.get('type')

        if(type is None or int(type) not in [settings.SUB_CATEGORY, settings.ROOT_CATEGORY]):
            return Response(result.resultResponse(False, ValidationError("Type category is required"), MessageCode.FA001.value))

        if (int(type) == settings.SUB_CATEGORY):
            queryset = SubCategory.objects.filter(is_active=settings.IS_ACTIVE)
        else:
            queryset = Category.objects.filter(is_active=settings.IS_ACTIVE)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, type=None, *args, **kwargs):
        """
        Delete a Category.
        type = 1: delete Category.
        type = 2: delete Sub Category.
        """
        # type = request.data.get('type')
        if(type is None or int(type) not in [settings.SUB_CATEGORY, settings.ROOT_CATEGORY]):
            return Response(result.resultResponse(False, ValidationError("Type category is required"), MessageCode.FA001.value))
        if(int(type) == settings.SUB_CATEGORY):
            subCatID = kwargs['pk']
            subCat = SubCategory.objects.get(pk=subCatID)
            self.perform_delete(subCat)
            queryset = SubCategory.objects.filter(is_active=settings.IS_ACTIVE)
        else:
            instance = self.get_object()
            # delete relation
            SubCategory.objects.select_related().filter(category=instance).update(is_active=settings.IS_INACTIVE)
            instance.is_active = settings.IS_INACTIVE
            instance.updated = datetime.now()
            instance.save()
            queryset = Category.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def perform_delete(self, instance):
        instance.is_active = settings.IS_INACTIVE
        instance.updated = datetime.now()
        instance.save()

    def export_csv(self, request, *args, **kwargs):
        """
        Export data categories to csv.
        """
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="categories.csv"'

        data = SubCategory.objects.filter(is_active=settings.IS_ACTIVE)
        writer = csv.writer(response)
        writer.writerow(['sub_category_id', 'sub_category_name', 'sub_category_order',
                         'category_id', 'category_name', 'category_order'])
        for subCatData in data:
            writer.writerow([subCatData.id, subCatData.name, subCatData.order, subCatData.category.id,
                             subCatData.category.name, subCatData.category.order])
        return response
