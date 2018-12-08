from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import OutletStoreContact, OutletStoreContactReply
#from mrelife.outletstores.ouletstorecontacts.serializers import OutletStoreContactSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer

class OutletStoreVContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = OutletStoreContact
        fields = '__all__'


class OutletStoreContactReplySerializer(serializers.ModelSerializer):
    outlet_store_contact_id = serializers.PrimaryKeyRelatedField(queryset=OutletStoreContact.objects.filter(is_active=1), write_only=True)
    outlet_store_contact = OutletStoreVContactSerializer(read_only=True,many=False)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1), write_only=True)
    user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields = ('outlet_store_contact_id','outlet_store_contact', 'user_id', 'user', 'comment', 'is_active')
