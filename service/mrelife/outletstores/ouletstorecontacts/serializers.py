from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import (OutletStore, OutletStoreContact)
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class OutletStoreContactSerializer(serializers.ModelSerializer):
    outlet_store_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    outlet_store = OutletStoreSerializer(read_only=True)
    name = serializers.CharField(max_length=255)
    name_kana=serializers.CharField(max_length=255)
    zipcode = serializers.CharField(max_length=8)
    address=serializers.CharField(max_length=255)
    email=serializers.EmailField()
    tel=serializers.CharField(max_length=255)
    age=serializers.IntegerField()
    household_size=serializers.IntegerField()
    acreage = serializers.IntegerField()
    construction_position_type = serializers.IntegerField()
    construction_position = serializers.CharField(max_length=255)
    construction_duration = serializers.IntegerField()
    budger = serializers.IntegerField()
    household_income = serializers.IntegerField()
    construction_type = serializers.IntegerField()
    current_situation = serializers.IntegerField()
    content = serializers.CharField()
    is_active = serializers.BooleanField(default=True,read_only=False)
    class Meta:
        model = OutletStoreContact
        fields = ('id','outlet_store_id','outlet_store','name','name_kana','zipcode','address','email','tel',
                  'age','household_size','acreage','construction_position_type','construction_position','construction_duration','budger','household_income','construction_type','current_situation','content', 'is_active')

    def validate_outlet_store_id(self, outlet_store_id):
        try:
            item = OutletStore.objects.filter(is_active=1).get(id=outlet_store_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return outlet_store_id
