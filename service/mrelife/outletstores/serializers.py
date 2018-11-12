from mrelife.outletstores.models import OutletStore, Category, Tag, OutletStoreTag
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class OutletStoreSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(style={'base_template': 'textarea.html'})
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    thumbnail = serializers.ImageField(max_length=None, use_url=True, allow_empty_file=True)
    latitude = serializers.CharField(style={'base_template': 'textarea.html'})
    longitude = serializers.CharField(style={'base_template': 'textarea.html'})
    address = serializers.CharField(max_length=800)
    tel = serializers.CharField(max_length=13)
    email = serializers.CharField(max_length=100)
    zipcode = serializers.CharField(max_length=8)
    area_of_premises = serializers.CharField(max_length=50)
    start_time = serializers.DateTimeField(input_formats=['%Y-%m-%d', ], format="%d-%m-%Y", required=True)
    end_time = serializers.DateTimeField(input_formats=['%Y-%m-%d', ], format="%d-%m-%Y", required=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = OutletStore
        fields = ('id', 'title', 'content', 'category', 'thumbnail', 'latitude', 'longitude', 'address',
                  'tel', 'email', 'zipcode', 'area_of_premises', 'start_time', 'end_time', 'is_active')

    def validate(self, data):
        # Check that the start time, end time.
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
    # validate name is unique
    name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=Tag.objects.all())]
    )

    class Meta:
        model = Tag
        fields = ('id', 'name',)


class OutletStoreTagSerializer(serializers.ModelSerializer):
    outlet_store = OutletStoreSerializer(many=True)
    tag = TagSerializer(many=True)

    class Meta:
        model = OutletStoreTag
        fields = ('outlet_store', 'tag',)
