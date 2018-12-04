from datetime import datetime

from django.conf import settings
from django.core.exceptions import ValidationError
from rest_framework import generics, serializers, status, viewsets
from rest_framework.response import Response

from mrelife.locations.models import City, District
from mrelife.locations.serializers import CitySerializer, DistrictSerializer
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode


class LocationViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all().order_by('-order')
    serializer_class = CitySerializer

    def create(self, request, type=None):
        """
        Create a location.
        type = 1: create new City.
        type = 2: create new District.
        """
        #type = request.data.get('type')
        if(type is None or int(type) not in [settings.DISTRICT, settings.CITY]):
            return Response(result.resultResponse(False, ValidationError("Type location is required"), MessageCode.LOC003.value), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        if (int(type) == settings.DISTRICT):
            serializer = DistrictSerializer(data=request.data)
        else:
            serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(result.resultResponse(True, serializer.data, MessageCode.LOC001.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.LOC002.value), status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(created=datetime.now(), updated=datetime.now())

    def update(self, request, type=None, *args, **kwargs):
        """
        Update a location.
        type = 1: update data City.
        type = 2: update data District.
        """
        partial = kwargs.pop('partial', False)

        #type = request.data.get('type')
        if(type is None or int(type) not in [settings.DISTRICT, settings.CITY]):
            return Response(result.resultResponse(False, ValidationError("Type location is required"), MessageCode.LOC003.value), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        if (int(type) == settings.DISTRICT):
            districtID = kwargs['pk']
            instance = District.objects.get(pk=districtID)
            serializer = DistrictSerializer(instance, data=request.data, partial=partial)
        else:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(result.resultResponse(True, serializer.data, MessageCode.LOC004.value))
        return Response(result.resultResponse(False, serializer.errors, MessageCode.LOC005.value), status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save(updated=datetime.now())

    def list(self, request, type=None, *args, **kwargs):
        """
        Get list Location.
        type = 1: get data City.
        type = 2: get data District.
        """
        #type = request.query_params.get('type')
        if(type is None or int(type) not in [settings.DISTRICT, settings.CITY]):
            return Response(result.resultResponse(False, ValidationError("Type location is required"), MessageCode.LOC003.value), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        if (int(type) == settings.DISTRICT):
            queryset = District.objects.filter(is_active=settings.IS_ACTIVE).order_by('-order')
        else:
            queryset = City.objects.filter(is_active=settings.IS_ACTIVE).order_by('-order')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        if (int(type) == settings.DISTRICT):
            serializer = DistrictSerializer(queryset, many=True)
        else:
            serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.LOC006.value))

    def destroy(self, request, type=None, *args, **kwargs):
        """
        Delete a Location.
        type = 1: delete City.
        type = 2: delete District.
        """

        #type = request.data.get('type')
        if(type is None or int(type) not in [settings.DISTRICT, settings.CITY]):
            return Response(result.resultResponse(False, ValidationError("Type location is required"), MessageCode.LOC003.value), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        if(int(type) == settings.DISTRICT):
            districtID = kwargs['pk']
            district = District.objects.get(pk=districtID)
            self.perform_delete(district)
            queryset = District.objects.filter(is_active=settings.IS_ACTIVE)

        else:
            instance = self.get_object()
            # delete relation
            District.objects.select_related().filter(city=instance).update(is_active=settings.IS_INACTIVE)
            instance.is_active = settings.IS_INACTIVE
            instance.updated = datetime.now()
            instance.save()
            queryset = City.objects.filter(is_active=settings.IS_ACTIVE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(result.resultResponse(True, serializer.data, MessageCode.LOC007.value), status=status.HTTP_205_RESET_CONTENT)

    def perform_delete(self, instance):
        instance.is_active = settings.IS_INACTIVE
        instance.updated = datetime.now()
        instance.save()
