from rest_framework.serializers import ModelSerializer

from mrelife.examplehouses.models import (ExampleHouse, ExampleHouseCommitment,
                                          ExampleHouseStyle, ExampleHouseTag)


from mrelife.outletstores.models import OutletStore
from mrelife.attributes.models import (Contruction, Floor,
                                       HouseHoldIncome, HouseHoldSize)

class ExampleHouseTagSerializer(ModelSerializer):

    class Meta:
        model = ExampleHouseTag
        fields = '__all__'


class ExampleHouseStyleSerializer(ModelSerializer):

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


class ExampleHouseNestedSerializer(ModelSerializer):
    ex_tags = ExampleHouseTagSerializer(many=True, read_only=False)
    styles = ExampleHouseStyleSerializer(many=True, read_only=False)
    commitments = ExampleHouseCommitmentSerializer(many=True, read_only=False)

    class Meta:
        model = ExampleHouse
        fields = '__all__'


class OutletStoreSerializer(ModelSerializer):

    class Meta:
        model = OutletStore
        fields = ('id', 'title', )


class ContructionSerializer(ModelSerializer):

    class Meta:
        model = Contruction
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

    class Meta:
        model = ExampleHouse
        fields = '__all__'
