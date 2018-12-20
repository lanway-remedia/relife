from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import OutletStoreContact, OutletStoreContactReply
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class OutletStoreContacVSerializer(serializers.ModelSerializer):
    outlet_store = OutletStoreSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContact
        fields = ('id', 'comment', 'create_user', 'outlet_store', 'is_active')


class OutletStoreContactReplySerializer(serializers.ModelSerializer):
    outlet_store_contact_id = serializers.PrimaryKeyRelatedField(queryset=OutletStoreContact.objects.filter(is_active=1), write_only=True)
    outlet_store_contact = OutletStoreContacVSerializer(read_only=True, many=False)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1), write_only=True)
    user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields = ('outlet_store_contact_id', 'outlet_store_contact', 'user_id', 'user', 'comment', 'is_active')
