from rest_framework import serializers

from mrelife.exhibitions.models import (ExhibitionContact,
                                        ExhibitionContactReply)
from mrelife.users.models import User
from mrelife.users.serializers import UserSerializer


class ExhibitionContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitionContact
        fields = '__all__'


class ExhibitionContactReplySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    comment = serializers.CharField()
    create_user = UserSerializer(read_only=True, required=False)
    exhibition_contact_id = serializers.IntegerField(write_only=True, required=True)
    exhibition_contact = ExhibitionContactSerializer(read_only=True, required=False)
    is_active = serializers.BooleanField(default=True, read_only=True)

    def validate_exhibition_contact_id(self, exhibition_contact_id):
        try:
            item = ExhibitionContact.objects.get(id=exhibition_contact_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return exhibition_contact_id

    class Meta:
        model = ExhibitionContactReply
        fields = ('id', 'comment', 'create_user', 'exhibition_contact_id', 'exhibition_contact', 'is_active')
