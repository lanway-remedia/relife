from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.modelhouses.models import ModelHouse, ModelhouseReview
from mrelife.modelhouses.serializers import ModelHouseSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ModelHouseReviewSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    model_house_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    create_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    model_house = ModelHouseSerializer(read_only=True, required=False)
    create_user = UserSerializer(read_only=True, required=False),
    update_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    update_user = UserSerializer(read_only=True, required=False)

    class Meta:
        model = ModelhouseReview
        fields = ('id', 'rating', 'review', 'model_house_id', 'create_user_id',
                  'model_house', 'is_active', 'update_user_id', 'update_user')

    def validate_model_house_id(self, model_house_id):
        try:
            item = ModelHouse.objects.get(id=model_house_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return model_house_id
