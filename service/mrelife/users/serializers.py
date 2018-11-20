from django.contrib.auth import get_user_model
from rest_framework.serializers import CharField, ModelSerializer, Serializer, ValidationError

User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'username')


class PasswordSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
    password = CharField(required=True)
    password1 = CharField(required=True)
    password2 = CharField(required=True)

    def validate(self, attrs):
        """
        Check that the 2 password is the same.
        """
        # TODO: Change error message
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("US002")
        return attrs
