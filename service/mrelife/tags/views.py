from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from mrelife.outletstores.models import Tag
from mrelife.outletstores.serializers  import TagSerializer
from datetime import datetime
from rest_framework import status
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode
from django.conf import settings


class TagViewSet(viewsets.ModelViewSet):

    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    """
    Create a model instance.
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
           
            return Response(result.resultResponse(True,serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False,serializer.errors, MessageCode.FA001.value))

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now() )
    
    """
    Update a model instance.
    """
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}
        
            return Response(result.resultResponse(True,serializer.data, MessageCode.SU001.value))
        return Response(result.resultResponse(False,serializer.errors, MessageCode.FA001.value))
    def perform_update(self, serializer):
        serializer.save(updated=datetime.now() )
    
    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        queryset = Tag.objects.filter(is_active=settings.IS_ACTIVE)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True,serializer.data, MessageCode.SU001.value))

    """
    Destroy a model instance.
    """
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = settings.IS_INACTIVE
        instance.save()
        queryset = Tag.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True,serializer.data, MessageCode.SU001.value))

