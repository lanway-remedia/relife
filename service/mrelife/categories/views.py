from datetime import datetime

from django.conf import settings
from mrelife.outletstores.models import Category, SubCategory
from mrelife.categories.serializers import CategorySerializer, SubCategorySerializer
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    """
    Create a model instance.
    """

    def create(self, request, *args, **kwargs):
        if (int(request.data.get('type')) == settings.SUB_CATEGORY):
            serializer = SubCategorySerializer(data=request.data)
        else:
            serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    """
    Update a model instance.
    """

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if (int(request.data.get('type')) == settings.SUB_CATEGORY):
            subCatID = kwargs['pk']
            subCat = SubCategory.objects.get(pk=subCatID)
            serializer = SubCategorySerializer(subCat, data=request.data, partial=partial)
        else:
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

    """
    List a queryset.
    """

    def list(self, request, *args, **kwargs):
        #type = request.query_params.get('type')
        #if(type is None):
            #return Response(result.resultResponse(False, serializers.ValidationError("ok error"), MessageCode.SU001.value))
           
        if (int(request.query_params.get('type')) == settings.SUB_CATEGORY):
            queryset = SubCategory.objects.filter(is_active=settings.IS_ACTIVE)
        else:
            queryset = Category.objects.filter(is_active=settings.IS_ACTIVE)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    """
    Destroy a model instance.
    """

    def destroy(self, request, *args, **kwargs):
        if(int(request.data.get('type'))== settings.SUB_CATEGORY):
            subCatID = kwargs['pk']
            subCat = SubCategory.objects.get(pk=subCatID)
            subCat.is_active = settings.IS_INACTIVE
            subCat.updated = datetime.now()
            subCat.save()
            queryset = SubCategory.objects.filter(is_active=settings.IS_ACTIVE)
        else:
            instance = self.get_object()
            instance.is_active = settings.IS_INACTIVE
            instance.updated = datetime.now()
            instance.save()
            queryset = Category.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))
