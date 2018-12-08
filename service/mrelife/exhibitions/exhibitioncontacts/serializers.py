from rest_framework import serializers

from mrelife.exhibitions.models import Exhibition, ExhibitionContact, ExhibitionContactReply
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionVSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exhibition
        fields = '__all__'


class ExhibitionContactReplyVSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExhibitionContactReply
        fields = '__all__'


class ExhibitionContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(max_length=None)
    create_user = UserSerializer(read_only=True, required=False)
    create_user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=1), write_only=True)
    exhibition_id = serializers.PrimaryKeyRelatedField(queryset=Exhibition.objects.filter(is_active=1), write_only=True)
    exhibition = ExhibitionVSerializer(many=True, read_only=True, required=False)
    exhibition_contact_reply = ExhibitionContactReplyVSerializer(read_only=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = ExhibitionContact
        fields = ('id', 'content', 'create_user', 'create_user_id', 'exhibition_id', 'exhibition', 'exhibition_contact_reply','is_active')
