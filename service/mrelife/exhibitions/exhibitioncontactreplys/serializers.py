from rest_framework import serializers

from mrelife.exhibitions.models import ExhibitionContactReply
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionContactReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitionContactReply
        fields = '__all__'
