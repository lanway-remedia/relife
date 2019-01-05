from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.outletstores.models import OutletStore, OutletStoreReview
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class OutletStoreReviewSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    outlet_store_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    outlet_store = OutletStoreSerializer(read_only=True, required=False)
    create_user = UserSerializer(read_only=True, required=False),
    update_user = UserSerializer(read_only=True, required=False)
    is_active = serializers.BooleanField(default=True,read_only=False)

    class Meta:
        model = OutletStoreReview
        fields = ('id', 'rating', 'review', 'outlet_store_id',
                  'outlet_store', 'is_active',  'update_user')

    def validate_outlet_store_id(self, outlet_store_id):
        try:
            item = OutletStore.objects.get(id=outlet_store_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return outlet_store_id
