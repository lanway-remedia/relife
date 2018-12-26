"""
    Authenticate Serializer
"""
from rest_framework.serializers import (CharField, EmailField, Serializer,
                                        ValidationError)

from mrelife.authenticates.lanway_portal import lanway_login, lanway_user_exist
from mrelife.utils.validates import email_exist, username_exist

######################################################################
# Version 1


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
        if email_exist(attrs['mail']):
            raise ValidationError("RG001")
        if username_exist(attrs['username']):
            raise ValidationError("RG002")
        return attrs

######################################################################
# Version 2


class LoginSerializer(Serializer):
    """
        Serializer for password change endpoint.
    """
    username = CharField(required=True)
    password = CharField(required=True)

    def validate(self, attrs):
        """
            check account is exist
        """
        valid, detail = lanway_login(attrs['username'], attrs['password'])
        if not valid:
            if detail == 'ECIS':
                raise ValidationError("LWLG001")
            if detail == 'ECWP':
                raise ValidationError("LWLG002")
            if detail == 'ECNE':
                raise ValidationError("LWLG003")
        return attrs


class RegisterV2Serializer(Serializer):
    """
        Serializer for register with lanway db checked endpoint.
    """
    mail = EmailField(required=True)
    username = CharField(required=True)
    password1 = CharField(required=True)
    password2 = CharField(required=True)
    domain = CharField(required=True)

    def validate(self, attrs):
        """
            Check password and existing of email
        """
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("US002")
        valid, detail = lanway_user_exist(attrs['mail'])
        if valid:
            raise ValidationError("RG001")
        return attrs
