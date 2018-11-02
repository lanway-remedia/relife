from rest_framework import serializers
from outletstores.models import OutletStore


class OutletStoreSerializer(serializers.ModelSerializer):

    thumbnail = serializers.ImageField(max_length= None, use_url=True)
    class Meta:
        model = OutletStore
        fields = ('id', 'title', 'content', 'category', 'thumbnail', 'latitude', 'longitude', 'address',
        'tel', 'email', 'zipcode', 'area_of_premises', 'start_time', 'end_time', 'is_active', )
        #fields ='__all__'
    
    def validate(self, data):
        """
        Check that the start time, end time.
        """
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data