from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.outletstores.models import (OutletStore, OutletStoreContact)
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class OutletStoreContactSerializer(serializers.ModelSerializer):
    outlet_store_id = serializers.IntegerField(write_only=True, required=True, allow_null=False)
    outlet_store = OutletStoreSerializer(read_only=True)
    name = serializers.CharField(max_length=255)
    name_kana=serializers.CharField(max_length=255)
    zipcode = serializers.CharField(max_length=8)
    address=serializers.CharField(max_length=255)
    email=serializers.EmailField()
    tel=serializers.CharField(max_length=255)
    age=serializers.IntegerField()
    # household_size=serializers.ChoiceField(choices=settings.HOUSEHOLDSIZE,default='現住所と同じ' )
    acreage = serializers.ChoiceField(choices=settings.ACREAGE,default='20坪以下')
    construction_position_type = serializers.ChoiceField(choices=settings.CONSTRUCTIONPOSITIONTYPE,default='現住所と同じ' )
    construction_position = serializers.CharField(max_length=255)
    construction_duration = serializers.ChoiceField(choices=settings.CONSTRUCTIONDURATION,default='現住所と同じ' )
    budget = serializers.ChoiceField(choices=settings.BUDGET,default='現住所と同じ' )
    household_income = serializers.ChoiceField(choices=settings.HOUSEHOLDINCOME,default='現住所と同じ' )
    construction_type =serializers.ChoiceField(choices=settings.CONSTRUCTION_TYPE,default='現住所と同じ' )
    current_situation = serializers.ChoiceField(choices=settings.CURRENTSITUATION,default='現住所と同じ' )
    content = serializers.CharField()
    is_active = serializers.BooleanField(default=True,read_only=True)
    class Meta:
        model = OutletStoreContact
        fields = ('id','outlet_store_id','outlet_store','name','name_kana','zipcode','address','email','tel',
                  'age','household_size','acreage','construction_position_type','construction_position','construction_duration','budget','household_income','construction_type','current_situation','content','status', 'is_active')

    def validate_outlet_store_id(self, outlet_store_id):
        try:
            item = OutletStore.objects.filter(is_active=1).get(id=outlet_store_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return outlet_store_id
    def validate_household_size(self, household_size):
        return settings.HOUSEHOLDSIZE[household_size-1][1]
    def validate_acreage(self, acreage):
        return settings.ACREAGE[acreage-1][1]
    def validate_construction_position_type(self, construction_position_type):
        return settings.CONSTRUCTIONPOSITIONTYPE[construction_position_type-1][1]
    def validate_construction_duration(self, construction_duration):
        return settings.CONSTRUCTIONDURATION[construction_duration-1][1]
    def validate_budget(self, budget):
        return settings.BUDGET[budget-1][1]
    def validate_household_income(self, household_income):
        return settings.HOUSEHOLDINCOME[household_income-1][1]
    def validate_construction_type(self, construction_type):
        return settings.CONSTRUCTION_TYPE[construction_type-1][1]
    def validate_current_situation(self, current_situation):
        return settings.CURRENTSITUATION[current_situation-1][1]
class StatusRequestSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField(default=True)
    outlet_store_id = serializers.IntegerField(required=False,read_only=True, allow_null=False)
    outlet_store = OutletStoreSerializer(read_only=True)
    name = serializers.CharField(max_length=255,read_only=True)
    name_kana=serializers.CharField(max_length=255,read_only=True)
    zipcode = serializers.CharField(max_length=8,read_only=True)
    address=serializers.CharField(max_length=255,read_only=True)
    email=serializers.EmailField(read_only=True)
    tel=serializers.CharField(max_length=255,read_only=True)
    age=serializers.IntegerField(read_only=True)
    household_size=serializers.ChoiceField(choices=settings.HOUSEHOLDSIZE,read_only=True,default='現住所と同じ',style={'base_template': 'radio.html'} )
    acreage = serializers.ChoiceField(choices=settings.ACREAGE,read_only=True,default='20坪以下',style={'base_template': 'radio.html'} )
    construction_position_type = serializers.ChoiceField(read_only=True,choices=settings.CONSTRUCTIONPOSITIONTYPE,default='現住所と同じ' )
    construction_position = serializers.CharField(max_length=255,read_only=True)
    construction_duration = serializers.ChoiceField(read_only=True,choices=settings.CONSTRUCTIONDURATION,default='現住所と同じ' )
    budget = serializers.ChoiceField(read_only=True,choices=settings.BUDGET,default='現住所と同じ' )
    household_income = serializers.ChoiceField(read_only=True,choices=settings.HOUSEHOLDINCOME,default='現住所と同じ' )
    construction_type =serializers.ChoiceField(read_only=True,choices=settings.CONSTRUCTION_TYPE,default='現住所と同じ' )
    current_situation = serializers.ChoiceField(read_only=True,choices=settings.CURRENTSITUATION,default='現住所と同じ' )
    content = serializers.CharField(read_only=True)
    is_active = serializers.BooleanField(default=True,read_only=True)
    status = serializers.ChoiceField(read_only=True,choices=settings.STATUS,default=1,style={'base_template': 'radio.html'})
    class Meta:
        model = OutletStoreContact
        fields = ('id','outlet_store_id','outlet_store','name','name_kana','zipcode','address','email','tel',
                  'age','household_size','acreage','construction_position_type','construction_position','construction_duration','budget','household_income','construction_type','current_situation','content','status', 'is_active')

    