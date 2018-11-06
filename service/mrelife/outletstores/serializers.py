from rest_framework import serializers
from mrelife.outletstores.models import OutletStore, Tag, OutletStoreTag

class OutletStoreSerializer(serializers.ModelSerializer):

    thumbnail = serializers.ImageField(max_length=None, use_url=True)
    
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

    def create(self, validated_data):
        tag = Tag.objects.create(
            name=self.initial_data['tag_name'],
            is_active=True,
            created=validated_data['created'],
            updated=validated_data['updated']
        )
        outletstore = OutletStore.objects.create(**validated_data)
        outlet_store_tag = OutletStoreTag.objects.create(
            outlet_store=outletstore,
            tag=tag,
            is_active=True,
            created=validated_data['created'],
            updated=validated_data['updated']
        )
        return outletstore

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )
class OutletStoreTagSerializer(serializers.ModelSerializer):
    outlet_store = OutletStoreSerializer(many=True)
    tag = TagSerializer(many=True)
    class Meta:
        model = OutletStoreTag
        fields = ('outlet_store', 'tag', )

