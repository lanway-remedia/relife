from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.examplehouses.models import ExampleHouse,ExampleHouseReview
from mrelife.examplehouses.serializers import ExampleHouseTagSerializer
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExampleHouseReviewSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    example_house_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    create_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    example_house = ExampleHouseTagSerializer(read_only=True, required=False)
    create_user = UserSerializer(read_only=True, required=False),
    update_user_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    update_user = UserSerializer(read_only=True, required=False)

    class Meta:
        model = ExampleHouseReview
        fields = ('id', 'rating', 'review', 'example_house_id', 'create_user_id',
                  'example_house', 'is_active', 'update_user_id', 'update_user')

    def validate_example_house_id(self, example_house_id):
        try:
            item = ExampleHouse.objects.get(id=example_house_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return example_house_id
