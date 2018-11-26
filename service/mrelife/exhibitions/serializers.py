from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.events.serializers import EventExhibitionSerializer
from mrelife.exhibitions.models import Exhibition, ExhibitionContact, ExhibitionContactReply
from mrelife.locations.models import District
from mrelife.locations.serializers import DistrictSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitionContact
        fields = '__all__'


class ExhibitionContactReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitionContactReply
        fields = '__all__'


class ExhibitionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    content = serializers.CharField()
    img_thumbnail = serializers.CharField(max_length=800, allow_blank=True, allow_null=True, read_only=True)
    img_large = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)
    latitude = serializers.CharField()
    longtitude = serializers.CharField()
    address = serializers.CharField(max_length=800)
    district_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    zipcode = serializers.CharField(max_length=255, allow_blank=True)
    num_attend = serializers.IntegerField()
    start_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    is_active = serializers.BooleanField(default=True)
    exhibition_contact = ExhibitionContactSerializer(many=True, read_only=True, required=False)
    exhibition_contact_reply = ExhibitionContactReplySerializer(many=True, read_only=True, required=False)
    exhibition_event = EventExhibitionSerializer(many=True, read_only=True, required=False)
    create_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    district = DistrictSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)

    class Meta:
        model = Exhibition
        fields = ('id', 'title', 'content', 'img_thumbnail', 'img_large', 'latitude', 'district_id', 'longtitude', 'address', 'district', 'zipcode', 'num_attend', 'start_time', 'end_time',
                  'create_user_id', 'create_user', 'is_active', 'exhibition_contact', 'exhibition_contact_reply', 'exhibition_event')

    def validate_district_id(self, district_id):
        try:
            item = District.objects.get(id=district_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return district_id
    def validate(self, data):
        # Check that the start time, end time.
        try:
            if data['end_time'] < data['start_time']:
                raise serializers.ValidationError("Start time must be greater than end time")
        except KeyError as e:
            pass
        return data
