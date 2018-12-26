from rest_framework import serializers

from mrelife.events.models import (Event, EventContact, EventContactReply,
                                   EventExhibition, EventModelHouse)
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class EventContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventContact
        fields = '__all__'


class EventContactReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventContactReply
        fields = '__all__'


class EventExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventExhibition
        fields = '__all__'


class EventModelHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventModelHouse
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    content = serializers.CharField()
    url = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    start_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y/%m/%d', ], format="%Y/%m/%d", required=True)
    is_active = serializers.BooleanField(default=True, read_only=True)
    model_houses = EventModelHouseSerializer(many=True, read_only=True, required=False)
    create_user = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'title', 'content', 'url', 'start_time', 'end_time',
                  'create_user', 'model_houses', 'is_active')

    def validate(self, data):
        # Check that the start time, end time.
        try:
            if data['end_time'] < data['start_time']:
                raise serializers.ValidationError("Start time must be greater than end time")
        except KeyError as e:
            pass
        return data
