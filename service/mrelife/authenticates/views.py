
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

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

        if request.user.is_authenticated:
            return Response({
                'status': False,
                'messageCode': 'AU002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        email = serializer.data['mail']
        domain = serializer.data['domain']
        # Get user by email
        user = email_exist(email)
        if not user:
            return Response({
                'status': False,
                'messageCode': 'US001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_404_NOT_FOUND)

        # Generate token
        token_key = default_token_generator.make_token(user)

        # Information for email, include: subject, link, from email and to
        # email
        subject = "Reset Password"
        # Encode user id
        uuid = str(urlsafe_base64_encode(force_bytes(user.pk))).replace("b'", "").replace("'", "")
        # Url will be send to user, this will be replaced by real link
        url = domain + '/' + uuid + '/' + token_key
        # Send email
        mail_status = send_mail(subject, url, settings.DEFAULT_FROM_EMAIL, [user.email])

        # Check ok
        if mail_status:
            return Response({
                'status': True,
                'messageCode': 'RP001',
                'messageParams': {},
                'data': {'uuid': uuid, 'token': token_key}
            }, status=status.HTTP_200_OK)

        return Response({
            'status': False,
            'messageCode': 'MS001',
            'messageParams': {},
            'data': []
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetFromKey(APIView):
    serializer_class = PasswordSerializer
    parser_classes = (JSONParser,)

    @staticmethod
    def post(request, uidb64, token_key):
        """
            New password
        """
        if request.user.is_authenticated:
            return Response({
                'status': False,
                'messageCode': 'AU002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)

        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        # get user
        user = User.objects.filter(pk=uid_int).first()
        if not user:
            return Response({
                'status': False,
                'messageCode': 'US001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_404_NOT_FOUND)
        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return Response({
                'status': False,
                'messageCode': 'RP002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)
        # set new password
        user.set_password(serializer.data['password1'])
        user.save()
        return Response({
            'status': True,
            'messageCode': 'RP003',
            'messageParams': {},
            'data': []
        }, status=status.HTTP_200_OK)

    @staticmethod
    def get(request, uidb64, token_key):
        """
            Verify token_key before allow user create new password
        """
        if request.user.is_authenticated:
            return Response({
                'status': False,
                'messageCode': 'AU002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)

        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        try:
            user = User.objects.get(pk=uid_int)
            # Validate token
            # False if wrong or expire
            token_key = default_token_generator.check_token(user, token_key)
            if token_key:
                return Response({
                    'status': True,
                    'messageCode': 'RP004',
                    'messageParams': {},
                    'data': []
                }, status=status.HTTP_200_OK)
            return Response({
                'status': False,
                'messageCode': 'RP002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({
                'status': False,
                'messageCode': 'US001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_404_NOT_FOUND)
