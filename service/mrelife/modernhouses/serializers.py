from rest_framework import serializers
from modernhouses.models import ModernHouse


class ModernHouseSerializer(serializers.ModelSerializer):

    thumbnail = serializers.ImageField(max_length= None, use_url=True)
    class Meta:
        model = ModernHouse
        fields = ('id', 'title', 'content', 'category', 'thumbnail', 'area_of_premises', 'num_attend', 'price', 'start_time', 'end_time','create_user', 'is_active', )
        #fields ='__all__'
    
    def validate(self, data):
        """
        Check that the start time, end time.
        """
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data