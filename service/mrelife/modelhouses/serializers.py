from rest_framework.serializers import ModelSerializer

from mrelife.modelhouses.models import (ModelHouse, ModelHouseContact,
                                        ModelHouseContactReply,
                                        ModelHouseMedia, ModelHouseOutletStore,
                                        ModelHouseTag, ModelHouseUser)


class ModelHouseContactReplySerializer(ModelSerializer):

    class Meta:
        model = ModelHouseContactReply
        fields = '__all__'


class ModelHouseContactNestedSerializer(ModelSerializer):
    replies = ModelHouseContactReplySerializer(many=True, read_only=False)

    class Meta:
        model = ModelHouseContact
        fields = '__all__'


class ModelHouseContactSerializer(ModelSerializer):

    class Meta:
        model = ModelHouseContact
        fields = '__all__'


class ModelHouseOutletStoreSerializer(ModelSerializer):

    class Meta:
        model = ModelHouseOutletStore
        fields = '__all__'


class ModelHouseMediaSerializer(ModelSerializer):

    class Meta:
        model = ModelHouseMedia
        fields = '__all__'


class ModelHouseTagSerializer(ModelSerializer):

    class Meta:
        model = ModelHouseTag
        fields = '__all__'


class ModelHouseUserSerializer(ModelSerializer):

    class Meta:
        model = ModelHouseUser
        fields = '__all__'


class ModelHouseNestedSerializer(ModelSerializer):
    users = ModelHouseUserSerializer(many=True, read_only=False)
    tags = ModelHouseTagSerializer(many=True, read_only=False)
    medias = ModelHouseMediaSerializer(many=True, read_only=False)

    class Meta:
        model = ModelHouse
        fields = '__all__'


class ModelHouseSerializer(ModelSerializer):

    class Meta:
        model = ModelHouse
        fields = '__all__'
