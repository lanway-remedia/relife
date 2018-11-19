from rest_framework import serializers

from mrelife.events.models import Event, EventContact, EventExhibition, EventModelHouse
from mrelife.users.models import User


class EventContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventContact
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
    start_time = serializers.DateTimeField(input_formats=['%Y-%m-%d', ], format="%d-%m-%Y", required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d', ], format="%d-%m-%Y", required=True)
    create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    is_active = serializers.BooleanField(default=True)
    model_houses = EventModelHouseSerializer(many=True, read_only=True, required=False)
    event_exhibition = EventExhibitionSerializer(many=True, read_only=True, required=False)
    event_contact = EventContactSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Event
        fields = ('id', 'title', 'content', 'url', 'start_time', 'end_time',
                  'create_user', 'is_active', 'model_houses', 'event_exhibition',
                  'event_contact')

    def validate(self, data):
        # Check that the start time, end time.
        if data['end_time'] > data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data
