from rest_framework import serializers

from mrelife.exhibitions.models import Exhibition,District
from mrelife.users.models import User



class ExhibitionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only= True)
    title = serializers.CharField(max_length = 255)
    content = serializers.CharField()
    img_thumbnail =serializers.CharField(max_length=800,allow_blank=True, allow_null=True,read_only=True)
    img_large=serializers.ImageField()
    latitude=serializers.CharField()
    longtitude=serializers.CharField()
    address=serializers.CharField(max_length=800)
    district=serializers.PrimaryKeyRelatedField(queryset=District.objects.all())
    zipcode= serializers.CharField(max_length = 255,allow_blank=True)
    num_attend=serializers.IntegerField()
    start_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    create_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    is_active = serializers.BooleanField(default = True)

    class Meta:
        model = Exhibition
        fields = ('id', 'title', 'content','img_thumbnail','img_large', 'latitude','longtitude','address','district','zipcode','num_attend', 'start_time', 'end_time', 
                    'create_user','is_active' )
    def validate(self, data):
        # Check that the start time, end time.
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data
