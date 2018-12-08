from rest_framework import serializers

from mrelife.exhibitions.models import ExhibitionContact
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExhibitionContact
        fields = '__all__'
