from datetime import datetime

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.outletstores.models import OutletStore, OutletStoreMedia
from mrelife.outletstores.serializers import OutletStoreSerializer

# from mrelife.users.models import User
# from mrelife.users.serializers import UserSerializer


class OutletStoreMediaSerializer(serializers.ModelSerializer):
    outlet_store_id = serializers.PrimaryKeyRelatedField(
        queryset=OutletStore.objects.filter(is_active=1), write_only=True)
    outlet_store = OutletStoreSerializer(read_only=True)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    url = serializers.CharField(max_length=255)
    type_media = serializers.BooleanField(default=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreMedia
        fields = ('id', 'outlet_store_id', 'outlet_store', 'title', 'description',
                  'url', 'type_media', 'is_active')
