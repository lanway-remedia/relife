from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreContactReply, OutletStoreMedia
from mrelife.outletstores.outletstorecontactreplys.serializers import OutletStoreVContactSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer



class OutletStoreContactReplySerializer(serializers.ModelSerializer):
    outlet_store_contact_id = serializers.PrimaryKeyRelatedField(queryset=OutletStoreContact.objects.filter(is_active=1))
    outlet_store_contact = OutletStoreVContactSerializer(read_only=True, many=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1))
    user = UserSerializer(read_only=True, many=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields =('outlet_store_contact_id','outlet_store_contact','user_id','user','comment','is_active')

# class OutletStoreContactSerializer(serializers.ModelSerializer):
#     outlet_store = serializers.PrimaryKeyRelatedField(queryset=OutletStore.objects.filter(is_active=1))
#     create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1))
#     comment = serializers.CharField(max_length=255)
#     outlet_store_contact_relpy = OutletStoreContactReplySerializer(many=True, read_only=True, required=False)
#     is_active = serializers.BooleanField(default=True)

#     class Meta:
#         model = OutletStoreContact
#         fields = ('id', 'comment', 'create_user', 'outlet_store', 'outlet_store_contact_relpy', 'is_active')
