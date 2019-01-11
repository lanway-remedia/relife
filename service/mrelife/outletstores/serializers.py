from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import City
from mrelife.locations.serializers import CitySerializer
from mrelife.outletstores.models import OutletStore, OutletStoreBusiness, OutletStoreContact
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer



class OutletStoreContactSerializer(serializers.ModelSerializer):

    create_user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContact
        fields = ('id', 'comment', 'create_user', 'is_active')


class OutletStoreBusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = OutletStoreBusiness
        fields = '__all__'


class OutletStoreSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    type = serializers.IntegerField(required=False)
    slogan_title = serializers.CharField(max_length=255,required=False)
    slogan_content = serializers.CharField(max_length=255,required=False)
    content = serializers.CharField(style={'base_template': 'textarea.html'},required=False,allow_null=True, read_only=True)
    img_thumbnail = serializers.CharField(max_length=800, allow_blank=True, allow_null=True, read_only=True)
    img_large = serializers.FileField(max_length=None, use_url=True, allow_null=True,
                                      allow_empty_file=True, required=False)
    latitude = serializers.FloatField(required=False )
    longitude = serializers.FloatField(required=False)
    zipcode = serializers.CharField(max_length=8,required=False, allow_blank=True, allow_null=True)
    address = serializers.CharField(max_length=800,required=False,)
    city_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    tel = serializers.CharField(max_length=13,required=False)
    email = serializers.EmailField(max_length=100,allow_blank=True, allow_null=True,required=False)
    establish = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=False)
    charter_capital = serializers.IntegerField(required=False,)
    employee_total = serializers.IntegerField(required=False,)
    qualification = serializers.CharField(max_length=255, allow_null=True,required=False)
    permit_number = serializers.CharField(max_length=255, allow_null=True,required=False)
    construction_area = serializers.CharField(max_length=255, allow_null=True,required=False)
    construction_result = serializers.CharField(max_length=255, allow_null=True,required=False)
    min_price = serializers.IntegerField(required=False,)
    max_price = serializers.IntegerField(required=False,)
    time_serving = serializers.CharField(max_length=255, allow_blank=True, allow_null=True,required=False)
    city = CitySerializer(read_only=True,required=False)
    create_user = UserSerializer(read_only=True,required=False)
    is_active = serializers.BooleanField(default=True, read_only=True,)
    business = OutletStoreBusinessSerializer(many=True, read_only=True,required=False)

    class Meta:
        model = OutletStore
        fields = ('id', 'title', 'type', 'slogan_title', 'slogan_content', 'content', 'img_thumbnail', 'img_large', 'latitude', 'longitude', 'zipcode', 'address', 'city_id', 'city',
                  'tel', 'email', 'establish', 'charter_capital', 'employee_total', 'qualification', 'permit_number', 'construction_area', 'construction_result', 'min_price', 'max_price', 'time_serving', 'create_user','business',  'is_active')

    def validate_city_id(self, city_id):
        try:
            if not city_id:
                raise
            item = City.objects.get(id=city_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return city_id
