from rest_framework import serializers

from mrelife.events.models import Event, EventModelHouse
from mrelife.modelhouses.models import ModelHouse
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ModelhouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelHouse
        fields = '__all__'


class EventModelHouseSerializer(serializers.ModelSerializer):

    event_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    event = EventSerializer(read_only=True)
    modelhouse_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    modelhouse = ModelhouseSerializer(read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = EventModelHouse
        fields = ('id', 'event_id', 'event', 'modelhouse_id', 'modelhouse', 'is_active')
    
    def validate_event_id(self, event_id):
        try:
            item = Event.objects.filter(is_active=1).get(id=event_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return event_id
    def validate_modelhouse_id(self, modelhouse_id):
        try:
            item = ModelHouse.objects.filter(is_active=1).get(id=modelhouse_id)
            if(not item):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return modelhouse_id