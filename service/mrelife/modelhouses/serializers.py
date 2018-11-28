from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from mrelife.modelhouses.models import (
    ModelHouse,
    ModelHouseContact,
    ModelHouseContactReply,
    ModelHouseMedia,
    ModelHouseOutletStore,
    ModelHouseTag,
    ModelHouseUser,
    OrderModelHouse
)
from mrelife.users.serializers import UserSerializer


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


class OrderModelHouseSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tel = serializers.CharField(max_length=255, read_only=True, required=False)
    content = serializers.CharField(style={'base_template': 'textarea.html'}, required=False)
    status = serializers.BooleanField(default=True)
    is_active = serializers.BooleanField(default=True, required=False)
    create_user = UserSerializer(read_only=True)
    create_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    model_house = ModelHouseSerializer(read_only=True)
    model_house_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)

    class Meta:
        model = OrderModelHouse
        fields = ('id', 'tel', 'content', 'status', 'is_active',
                  'create_user', 'create_user_id', 'model_house', 'model_house_id')

    def validate_model_house_id(self, model_house_id):
        try:
            item = ModelHouse.objects.get(id=district_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return model_house_id


class OrderModelHouseStatusSerializer(ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    tel = serializers.CharField(max_length=255, read_only=True, required=False)
    content = serializers.CharField(style={'base_template': 'textarea.html'}, read_only=True, required=False)
    status = serializers.BooleanField(default=True)
    is_active = serializers.BooleanField(default=True, read_only=True, required=False)
    create_user = UserSerializer(read_only=True)
    model_house = ModelHouseSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = OrderModelHouse
        fields = '__all__'
