from rest_framework import serializers

from mrelife.modernhouses.models import ModernHouse
from mrelife.outletstores.models import Category
from mrelife.users.models import User


class ModernHouseSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length = 255)
    content = serializers.CharField(style={'base_template': 'textarea.html'})
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    thumbnail = serializers.CharField()
    area_of_premises = serializers.CharField(max_length = 50)
    num_attend=serializers.IntegerField()
    price=serializers.FloatField()
    start_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d',],format="%d-%m-%Y",required=True)
    create_user=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    is_active = serializers.BooleanField(default = True)
    #thumbnail = serializers.ImageField(max_length= None, use_url=True)

    class Meta:
        model = ModernHouse
        fields = ('id', 'title', 'content', 'category', 'thumbnail', 'area_of_premises', 'num_attend', 'price', 'start_time', 'end_time','create_user', 'is_active', )
        #fields ='__all__'
    
    def validate(self, data):
        #Check that the start time, end time.
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data
    