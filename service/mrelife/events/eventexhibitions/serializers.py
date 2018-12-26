from rest_framework import serializers

from mrelife.events.models import (Event, EventContact, EventContactReply,
                                   EventExhibition, EventModelHouse)
from mrelife.exhibitions.models import Exhibition
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition
        fields = '__all__'


class EventExhibitionSerializer(serializers.ModelSerializer):
    event_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    event = EventSerializer(read_only=True)
    exhibition_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    exhibition = ExhibitionSerializer(read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = EventExhibition
        fields = ('id', 'event_id', 'event', 'exhibition_id', 'exhibition', 'is_active')

    def validate_event_id(self, event_id):
        try:
            item = Event.objects.filter(is_active=1).get(id=event_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return event_id

    def validate_exhibition_id(self, exhibition_id):
        try:
            item = Exhibition.objects.filter(is_active=1).get(id=exhibition_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return exhibition_id
