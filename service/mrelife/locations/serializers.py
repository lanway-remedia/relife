from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import City, Region

class FilteredListSerializer(serializers.ListSerializer):
    
    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super(FilteredListSerializer, self).to_representation(data)

class RegionOfCitySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Region.objects.all())]
    )
    name_en = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Region.objects.all())]
    )
    #districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ('id', 'name', 'name_en', 'order', )


class CitySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=City.objects.all())]
    )
    name_en = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=City.objects.all())]
    )

    region = RegionOfCitySerializer(read_only=True)

    class Meta:
        model = City
        list_serializer_class = FilteredListSerializer
        fields = ('id', 'name', 'name_en', 'order', 'region')

    def create(self, validated_data):
        city = City.objects.create(
            name=self.initial_data['name'],
            name_en=self.initial_data['name_en'],
            order=validated_data['order'],
            region=Region.objects.get(pk=self.initial_data['region']),
            is_active=True,
            created=validated_data['created'],
            updated=validated_data['updated']
        )
        return city


class RegionSerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Region.objects.all())]
    )
    name_en = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Region.objects.all())]
    )
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ('id', 'name', 'name_en', 'order', 'cities')
