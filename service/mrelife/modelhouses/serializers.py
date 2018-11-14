from rest_framework import serializers

from mrelife.modelhouses.models import ModelHouse
from mrelife.users.models import User
from mrelife.outletstores.models import OutletStore


class ModelHouseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only= True)
    title = serializers.CharField(max_length = 255,allow_blank=True, allow_null=True)
    content = serializers.CharField()
    contruction_method=serializers.CharField(allow_blank=True, allow_null=True)
    property_feature=serializers.CharField(allow_blank=True, allow_null=True)
    manufacturer_name=serializers.CharField(max_length=255,allow_blank=True, allow_null=True)
    structure=serializers.CharField(max_length=255,allow_blank=True, allow_null=True)
    floor_map=serializers.CharField( max_length=255,allow_blank=True, allow_null=True)
    img_thumbnail = serializers.CharField(max_length=800,allow_blank=True, allow_null=True)
    img_large =serializers.CharField(max_length=800,allow_blank=True, allow_null=True)
    land_area=serializers.CharField(max_length=255,allow_blank=True, allow_null=True)
    construction_area=serializers.CharField(max_length=255,allow_blank=True, allow_null=True)
    outlet_store=serializers.PrimaryKeyRelatedField(queryset=OutletStore.objects.all())
    create_user=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    is_active = serializers.BooleanField(default = True)

    class Meta:
        model = ModelHouse
        fields = ('id', 'title', 'content','contruction_method','property_feature', 'manufacturer_name', 'structure', 'floor_map', 'img_thumbnail', 'img_large', 
                    'land_area','construction_area','outlet_store','create_user','is_active' )
'''   def validate(self, data):
        # Check that the start time, end time.
        if data['end_time'] < data['start_time']:
            raise serializers.ValidationError("Start time must be greater than end time")
        return data
'''
