
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import base36_to_int, int_to_base36

from mrelife.authenticates.serializers import (PasswordSerializer,
                                               ResetPasswordSerializer)
from mrelife.utils.validates import email_exist
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView


class PasswordResetRequest(APIView):
    serializer_class = ResetPasswordSerializer
    parser_classes = (JSONParser,)

    def post(self, request):
        if request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.object.get('email')
        domain = serializer.object.get('domain')
        # Get user by email
        user = email_exist(email)
        if not user:
            return Response({'detail': ''}, status=status.HTTP_404_NOT_FOUND)

        # Generate token
        token_key = default_token_generator.make_token(user)

        # Information for email, include: subject, link, from email and to
        # email
        subject = "Reset Password"
        # Encode user id
        uidb36 = int_to_base36(user.id)
        # Url will be send to user, this will be replaced by real link
        url = domain + '/' + uidb36 + '/' + token_key
        # Send email
        mail_status = send_email(subject, url, settings.DEFAULT_FROM_EMAIL, [user.email])

        # Check ok
        if mail_status:
            return Response({'detail': ''}, status=status.HTTP_200_OK)

        return Response({'detail': ''}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetFromKey(APIView):
    serializer_class = PasswordSerializer
    parser_classes = (JSONParser,)

    @staticmethod
    def post(request, uidb36, token_key):
        """
            New password
        """
        if request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Decode user id
        uid_int = base36_to_int(uidb36)
        # get user
        user = User.objects.filter(pk=uid_int).first()
        if not user.exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # set new password
        user.set_password(serializer.object.get('password1'))
        user.save()
        return Response({'detail': ''}, status=status.HTTP_200_OK)

    @staticmethod
    def get(request, uidb36, token_key):
        """
            Verify token_key before allow user create new password
        """
        if request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Decode user id
        uid_int = base36_to_int(uidb36)
        try:
            user = User.objects.get(pk=uid_int)
            # Validate token
            # False if wrong or expire
            token_key = default_token_generator.check_token(user, token_key)
            if token_key:
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
