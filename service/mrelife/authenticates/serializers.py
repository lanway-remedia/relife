from rest_framework.serializers import (CharField, EmailField, Serializer,
                                        ValidationError)

from mrelife.authenticates.lanway_portal import lanway_login, lanway_user_exist
from mrelife.utils.validates import email_exist, username_exist


class ResetPasswordSerializer(Serializer):
    """
    Serializer for password request endpoint.
    """
    mail = EmailField(required=True)
    domain = CharField(required=True)


class PasswordSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
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


class LoginSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
    username = CharField(required=True)
    password = CharField(required=True)

    def validate(self, attrs):
        """
        Check that the start is before the stop.
        """
        if not lanway_login(attrs['username'], attrs['password']):
            raise ValidationError("LWLG001")
        return attrs


class RegisterSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
    mail = EmailField(required=True)
    username = CharField(required=True)
    password1 = CharField(required=True)
    password2 = CharField(required=True)
    domain = CharField(required=True)

    def validate(self, attrs):
        """
        Check that the start is before the stop.
        """
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("US002")
        if lanway_user_exist(attrs['mail']):
            raise ValidationError("RG001")
        return attrs
