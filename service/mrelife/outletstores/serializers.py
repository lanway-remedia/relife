from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.outletstores.models import OutletStore, OutletStoreContact, OutletStoreContactReply, OutletStoreMedia
from mrelife.users.models import User


class OutletStoreMediaSerializer(serializers.ModelSerializer):
    outlet_store = serializers.PrimaryKeyRelatedField(queryset=OutletStore.objects.filter(is_active=1))
    type_media = serializers.BooleanField()
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    url = serializers.CharField(max_length=800)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreMedia
        fields = '__all__'


class OutletStoreContactReplySerializer(serializers.ModelSerializer):
    outlet_store_contact = serializers.PrimaryKeyRelatedField(queryset=OutletStoreContact.objects.filter(is_active=1))
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1))
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContactReply
        fields = '__all__'


class OutletStoreContactSerializer(serializers.ModelSerializer):
    outlet_store = serializers.PrimaryKeyRelatedField(queryset=OutletStore.objects.filter(is_active=1))
    create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1))
    comment = serializers.CharField(max_length=255)
    outlet_store_contact_relpy = OutletStoreContactReplySerializer(many=True, read_only=True, required=False)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStoreContact
        fields = ('id', 'comment', 'create_user', 'outlet_store', 'outlet_store_contact_relpy', 'is_active')


class OutletStoreSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(style={'base_template': 'textarea.html'})
    img_thumbnail = serializers.CharField(max_length=800, allow_blank=True, allow_null=True, read_only=True)
    img_large = serializers.FileField(required=True)
    latitude = serializers.CharField(style={'base_template': 'textarea.html'}, allow_blank=True, allow_null=True)
    longitude = serializers.CharField(style={'base_template': 'textarea.html'}, allow_blank=True, allow_null=True)
    address = serializers.CharField(max_length=800)
    district = serializers.PrimaryKeyRelatedField(queryset=District.objects.filter(is_active=1), write_only=True)
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
    # district = serializers.SerializerMethodField('is_named_bar', read_only=True)
    district = DistrictSerializer(many=False, read_only=True)

    def validate_district(self, dob):
        dob = District.objects.get(pk=self.initial_data['district'])
        return dob



    class Meta:
        model = OutletStore

        fields = ('id', 'title', 'content', 'img_thumbnail', 'img_large', 'latitude', 'longitude', 'address', 'district',
                  'tel', 'email', 'zipcode', 'home_page', 'traffic', 'time_serving', 'regular_holiday', 'create_user',
                  'is_active', 'outlet_store_media', 'outlet_store_contact')
