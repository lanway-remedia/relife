from rest_framework.serializers import ModelSerializer

from mrelife.attributes.models import (Contruction, Floor, HouseHoldIncome,
                                       HouseHoldSize, PriceRange, Style)
from mrelife.examplehouses.models import (ExampleHouse, ExampleHouseCommitment,
                                          ExampleHouseStyle, ExampleHouseTag)
from mrelife.locations.models import Region, City
from mrelife.outletstores.models import OutletStore


class ExampleHouseTagSerializer(ModelSerializer):

    class Meta:
        model = ExampleHouseTag
        fields = '__all__'


class StyleSerializer(ModelSerializer):

    class Meta:
        model = Style
        fields = '__all__'


class ExampleHouseStyleSerializer(ModelSerializer):
    style = StyleSerializer()

    class Meta:
        model = ExampleHouseStyle
        fields = '__all__'


class ExampleHouseCommitmentSerializer(ModelSerializer):

    class Meta:
        model = ExampleHouseCommitment
        fields = '__all__'


class ExampleHouseSerializer(ModelSerializer):
    class Meta:
        model = ExampleHouse
        fields = '__all__'

    def validate(self, data):
        # Auto user to create user
        data['create_user'] = self.context['request'].user
        return data


class RegionSerializer(ModelSerializer):

    class Meta:
        model = Region
        fields = ('id', 'name', 'name_en',)


class CitySerializer(ModelSerializer):
    region = RegionSerializer()

    class Meta:
        model = City
        fields = ('id', 'name', 'name_en', 'region')


class OutletStoreSerializer(ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = OutletStore
        fields = '__all__'


class ContructionSerializer(ModelSerializer):

    class Meta:
        model = Contruction
        fields = ('id', 'title', )


class PriceRangeSerializer(ModelSerializer):

    class Meta:
        model = PriceRange
        fields = ('id', 'title', )


class FloorSerializer(ModelSerializer):

    class Meta:
        model = Floor
        fields = ('id', 'title', )


class HouseHoldSizeSerializer(ModelSerializer):

    class Meta:
        model = HouseHoldSize
        fields = ('id', 'title', )


class HouseHoldIncomeSerializer(ModelSerializer):

    class Meta:
        model = HouseHoldIncome
        fields = ('id', 'title', )


class ExampleHouseNestedNameOnlySerializer(ModelSerializer):
    store = OutletStoreSerializer()
    contruction = ContructionSerializer()
    floor = FloorSerializer()
    household_size = HouseHoldSizeSerializer()
    household_income = HouseHoldIncomeSerializer()
    styles = ExampleHouseStyleSerializer(many=True, read_only=False)

    class Meta:
        model = ExampleHouse
        fields = '__all__'


class ExampleHouseNestedSerializer(ModelSerializer):
    ex_tags = ExampleHouseTagSerializer(many=True, read_only=False)
    styles = ExampleHouseStyleSerializer(many=True, read_only=False)
    commitments = ExampleHouseCommitmentSerializer(many=True, read_only=False)
    store = OutletStoreSerializer()
    contruction = ContructionSerializer()
    price_range = PriceRangeSerializer()
    floor = FloorSerializer()
    household_size = HouseHoldSizeSerializer()
    household_income = HouseHoldIncomeSerializer()

    class Meta:
        model = ExampleHouse
        fields = '__all__'
