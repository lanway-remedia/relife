from datetime import datetime

from django.conf import settings
from mrelife.tags.models import Tag
from mrelife.tags.resources import TagResource
from mrelife.tags.serializers import TagSerializer
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a Tag.
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
        Update a Tag was exist.
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
        Get list Tag.
        """
        queryset = Tag.objects.filter(is_active=settings.IS_ACTIVE)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def destroy(self, request, *args, **kwargs):
        """
        Delete a Tag.
        """
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = Tag.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.SU001.value))

    def export_csv(self, request, *args, **kwargs):
        """
        Export data tag to csv.
        """
        tag_resource = TagResource()
        queryset = Tag.objects.filter(is_active=settings.IS_ACTIVE)
        dataset = tag_resource.export(queryset)
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="tag.csv"'
        return response
