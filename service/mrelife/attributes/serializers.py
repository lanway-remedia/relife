from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from mrelife.attributes.models import Contruction, PriceRange, Floor, Style, HouseHoldIncome, HouseHoldSize


class ContructionSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Contruction.objects.all())]
    )

    class Meta:
        model = Contruction
        fields = ('id', 'title', 'order', )


class PriceRangeSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=PriceRange.objects.all())]
    )

    class Meta:
        model = PriceRange
        fields = ('id', 'title', 'order',)


class FloorSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Floor.objects.all())]
    )

    class Meta:
        model = Floor
        fields = ('id', 'title', 'order')


class StyleSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Style.objects.all())]
    )

    class Meta:
        model = Style
        fields = ('id', 'title', 'order')


class HouseHoldIncomeSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=HouseHoldIncome.objects.all())]
    )

    class Meta:
        model = HouseHoldIncome
        fields = ('id', 'title', 'order')


class HouseHoldSizeSerializer(serializers.ModelSerializer):
    # validate title is unique
    title = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=HouseHoldSize.objects.all())]
    )

    class Meta:
        model = HouseHoldSize
        fields = ('id', 'title', 'order')
