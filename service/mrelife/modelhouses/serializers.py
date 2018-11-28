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

    class Meta:
        model = OrderModelHouse
        fields = '__all__'


"""
    
    create_user = ForeignKey('users.User', related_name="creating_order_model_house",
                             on_delete=CASCADE, blank=True, null=True)
    model_house = ForeignKey(ModelHouse, related_name="order_model_house", on_delete=CASCADE, blank=True, null=True)
    tel = CharField(max_length=13, null=False)
    content = TextField(null=False)
    status = BooleanField(null=False)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)
"""


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
