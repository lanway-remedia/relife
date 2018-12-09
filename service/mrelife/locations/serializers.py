from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.locations.models import City, District

class FilteredListSerializer(serializers.ListSerializer):
    
    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super(FilteredListSerializer, self).to_representation(data)

class CityOfDistrictSerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=City.objects.all())]
    )
    name_en = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=City.objects.all())]
    )
    #districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ('id', 'name', 'name_en', 'order', )


class DistrictSerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=District.objects.all())]
    )
    name_en = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=District.objects.all())]
    )

    city = CityOfDistrictSerializer(read_only=True)

    class Meta:
        model = District
        list_serializer_class = FilteredListSerializer
        fields = ('id', 'name', 'name_en', 'order', 'city')

    def create(self, validated_data):
        district = District.objects.create(
            name=self.initial_data['name'],
            name_en=self.initial_data['name_en'],
            order=validated_data['order'],
            city=City.objects.get(pk=self.initial_data['city']),
            is_active=True,
            created=validated_data['created'],
            updated=validated_data['updated']
        )
        return district


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
    districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ('id', 'name', 'name_en', 'order', 'districts')
