from rest_framework.serializers import (CurrentUserDefault, HiddenField,
                                        ModelSerializer)

from mrelife.examplehouses.models import (ExampleHouse, ExampleHouseCommitment,
                                          ExampleHouseStyle, ExampleHouseTag)


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
    create_user = HiddenField(default=CurrentUserDefault())
    class Meta:
        model = ExampleHouse
        fields = '__all__'


class ExampleHouseNestedSerializer(ModelSerializer):
    tags = ExampleHouseTagSerializer(many=True, read_only=False)
    styles = ExampleHouseStyleSerializer(many=True, read_only=False)
    commitments = ExampleHouseCommitmentSerializer(many=True, read_only=False)

    class Meta:
        model = ExampleHouse
        fields = '__all__'
