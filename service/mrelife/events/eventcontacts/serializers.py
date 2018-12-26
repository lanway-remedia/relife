from rest_framework import serializers

from mrelife.events.models import (Event, EventContact, EventContactReply,
                                   EventExhibition, EventModelHouse)
from mrelife.events.serializers import EventSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class EventContactReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventContactReply
        fields = '__all__'


class EventContactSerializer(serializers.ModelSerializer):
    event_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    event = EventSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    event_contact_reply = EventContactReplySerializer(many=True, read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = EventContact
        fields = ('id', 'comment', 'event_id',
                  'event', 'create_user', 'event_contact_reply', 'is_active')

    def validate_event_id(self, event_id):
        try:
            item = Event.objects.filter(is_active=1).get(id=event_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return event_id
