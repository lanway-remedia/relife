from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.exhibitions.models import District
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreMedia
from mrelife.users.models import User


class OutletStoreMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutletStoreMedia
        fields = '__all__'


class OutletStoreContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutletStoreContact
        fields = '__all__'


class OutletStoreSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(style={'base_template': 'textarea.html'})
    img_thumbnail = serializers.CharField(max_length=800, allow_blank=True, allow_null=True, read_only=True)
    img_large = serializers.FileField(required=True)
    latitude = serializers.CharField(style={'base_template': 'textarea.html'}, allow_blank=True, allow_null=True)
    longitude = serializers.CharField(style={'base_template': 'textarea.html'}, allow_blank=True, allow_null=True)
    address = serializers.CharField(max_length=800)
    district = serializers.PrimaryKeyRelatedField(queryset=District.objects.all())
    tel = serializers.CharField(max_length=13)
    email = serializers.CharField(max_length=100)
    zipcode = serializers.CharField(max_length=8, allow_blank=True, allow_null=True)
    home_page = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    traffic = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    time_serving = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    regular_holiday = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1))
    is_active = serializers.BooleanField(default=True)
    outlet_store_media = OutletStoreMediaSerializer(many=True, read_only=True, required=False)
    outlet_store_contact = OutletStoreContactSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = OutletStore

        fields = ('id', 'title', 'content', 'img_thumbnail', 'img_large', 'latitude', 'longitude', 'address', 'district',
                  'tel', 'email', 'zipcode', 'home_page', 'traffic', 'time_serving', 'regular_holiday', 'create_user',
                  'is_active', 'outlet_store_media', 'outlet_store_contact')
