from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreContactReply
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class OutletStoreContactVReplySerializer(serializers.ModelSerializer):

    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1), write_only=True)
    user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields = ('user_id', 'user', 'comment', 'is_active')


class OutletStoreContactSerializer(serializers.ModelSerializer):
    outlet_store_id = serializers.PrimaryKeyRelatedField(
        queryset=OutletStore.objects.filter(is_active=1), write_only=True)
    create_user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1), write_only=True)
    outlet_store = OutletStoreSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    outlet_store_contact_relpy = OutletStoreContactVReplySerializer(many=True, read_only=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContact
        fields = ('id', 'comment', 'create_user', 'outlet_store_id', 'create_user_id',
                  'outlet_store', 'outlet_store_contact_relpy', 'is_active')