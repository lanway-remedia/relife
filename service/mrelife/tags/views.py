from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from mrelife.outletstores.models import Tag
from mrelife.outletstores.serializers  import TagSerializer
from datetime import datetime
from rest_framework import status

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
            resultSuccess = {
                'status': True,
                'messageCode': None,
                'messageParams': None,
                'data': serializer.data
            }
            return Response(resultSuccess, status=status.HTTP_201_CREATED, headers=headers)
        resultError = {
            "status": False,
             'messageCode': 'MSG01',
              "errors": serializer.errors,
              "data":[]
        }
        return Response(resultError, status=status.HTTP_200_OK)

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
            resultSuccess = {
                'status': True,
                'messageCode': None,
                'messageParams': None,
                'data': serializer.data
            }
            return Response(resultSuccess)
        resultError = {
            "status": False,
             'messageCode': 'MSG01',
              "errors": serializer.errors,
              "data":[]
        }
        return Response(resultError, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now() )
    
    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        resultSuccess = {
                'status': True,
                'messageCode': None,
                'messageParams': None,
                'data': serializer.data
            }
        return Response(resultSuccess)
