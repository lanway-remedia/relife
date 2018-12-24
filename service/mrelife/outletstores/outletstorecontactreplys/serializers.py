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
    outlet_store_contact_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    outlet_store_contact = OutletStoreContacVSerializer(read_only=True, many=False)
    user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields = ('outlet_store_contact_id', 'outlet_store_contact', 'user', 'comment', 'is_active')

    def validate_outlet_store_contact_id(self, outlet_store_contact_id):
        try:
            item = OutletStoreContact.objects.filter(is_active=1).get(id=outlet_store_contact_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return outlet_store_contact_id
