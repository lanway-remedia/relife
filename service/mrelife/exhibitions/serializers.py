from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.events.serializers import EventExhibitionSerializer
from mrelife.exhibitions.models import (Exhibition, ExhibitionContact,
                                        ExhibitionContactReply, ExhibitionTag)
from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionContactReplySerializer(serializers.ModelSerializer):
    create_user = UserSerializer(read_only=True)

    class Meta:
        model = ExhibitionContactReply
        fields = '__all__'


class ExhibitionContactSerializer(serializers.ModelSerializer):

    exhibition_contact_reply = ExhibitionContactReplySerializer(many=True, read_only=True)
    create_user = UserSerializer(read_only=True)

    class Meta:
        model = ExhibitionContact
        fields = ('id', 'exhibition_contact_reply', 'comment', 'is_active', 'created', 'updated',  'create_user')


class ExhibitionTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitionTag
        fields = '__all__'


class ExhibitionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(max_length=None)
    img_thumbnail = serializers.CharField(max_length=800, allow_blank=True, allow_null=True, read_only=True)
    img_large = serializers.ImageField(max_length=None, use_url=True, allow_null=True,
                                       allow_empty_file=True, required=False)
    latitude = serializers.CharField()
    longtitude = serializers.CharField()
    address = serializers.CharField(max_length=800)
    district_id = serializers.IntegerField(write_only=True, required=False, allow_null=False, default=0)
    zipcode = serializers.CharField(max_length=255, allow_blank=True)
    num_attend = serializers.IntegerField()
    start_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    exhibition_event = EventExhibitionSerializer(many=True, read_only=True, required=False)
    exhibition_tag = ExhibitionTagSerializer(many=True, read_only=True, required=False)
    district = DistrictSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = Exhibition
        fields = ('id', 'title', 'content', 'img_thumbnail', 'img_large', 'latitude', 'district_id', 'longtitude', 'address', 'district', 'zipcode', 'num_attend', 'start_time', 'end_time',
                  'create_user', 'is_active', 'exhibition_tag',  'exhibition_event')

    def validate_district_id(self, district_id):
        try:
            item = District.objects.get(id=district_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return district_id

    def validate_img_large(self, img_large):
        try:
            if not img_large:
                img_large = None
        except Exception as e:
            raise serializers.ValidationError(e)
        return img_large

    def validate(self, data):
        # Check that the start time, end time.
        try:
            if data['end_time'] < data['start_time']:
                raise serializers.ValidationError("Start time must be greater than end time")
        except KeyError as e:
            pass
        return data
