from rest_framework import serializers

from mrelife.events.models import (Event, EventContact, EventContactReply,
                                   EventExhibition, EventModelHouse)
from mrelife.events.serializers import EventSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class EventContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventContact
        fields = '__all__'


class EventContactReplySerializer(serializers.ModelSerializer):
    event_contact_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    event_contact = EventContactSerializer(read_only=True)
    create_user = UserSerializer(read_only=True)
    comment = serializers.CharField(max_length=255)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = EventContactReply
        fields = ('id', 'comment', 'event_contact_id',
                  'create_user', 'event_contact', 'is_active')

    def validate_event_contact_id(self, event_contact_id):
        try:
            item = EventContact.objects.filter(is_active=1).get(id=event_contact_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return event_contact_id
