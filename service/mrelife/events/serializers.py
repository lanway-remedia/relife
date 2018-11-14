from rest_framework import serializers

from mrelife.events.models import Event
from mrelife.users.models import User



class EventSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only= True)
    title = serializers.CharField(max_length = 255,allow_blank=True, allow_null=True)
    content = serializers.CharField()
    url=serializers.CharField(max_length=255,allow_blank=True, allow_null=True)
    start_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    is_active = serializers.BooleanField(default = True)

    class Meta:
        model = Event
        fields = ('id', 'title', 'content', 'url', 'start_time', 'end_time', 
                    'create_user','is_active' )
    def validate(self, data):
        # Check that the start time, end time.
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data
