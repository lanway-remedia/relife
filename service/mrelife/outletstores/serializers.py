from rest_framework import serializers
from mrelife.outletstores.models import OutletStore, Category
from mrelife.outletstores.models import OutletStore

class OutletStoreSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length = 255)
    content =  serializers.CharField(style={'base_template': 'textarea.html'})
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    thumbnail = serializers.ImageField(max_length= None, use_url=True, allow_empty_file =True)
    latitude = serializers.CharField(style={'base_template': 'textarea.html'})
    longitude = serializers.CharField(style={'base_template': 'textarea.html'})
    address = serializers.CharField(max_length =800)
    tel = serializers.CharField(max_length = 13)
    email = serializers.CharField(max_length = 100)
    zipcode = serializers.CharField(max_length = 8)
    area_of_premises = serializers.CharField(max_length = 50)
    start_time =serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    is_active =  serializers.BooleanField(default=True)

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
