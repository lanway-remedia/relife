from rest_framework.serializers import CharField, Serializer, ValidationError


class ResetPasswordSerializer(Serializer):
    """
    Serializer for password request endpoint.
    """
    mail = CharField(required=True)
    domain = CharField(required=True)


class PasswordSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
    password1 = CharField(required=True)
    password2 = CharField(required=True)

    def validate(self, attrs):
        """
        Check that the start is before the stop.
        """
        # TODO: Change error message
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("P1_Khac_P2")
        return attrs
