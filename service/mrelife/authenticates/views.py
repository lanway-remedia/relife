from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView

from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import (PasswordSerializer,
                                               RegisterSerializer,
                                               ResetPasswordSerializer)
from mrelife.utils.groups import GroupUser
from mrelife.utils.querys import get_or_none
from mrelife.utils.validates import email_exist

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

User = get_user_model()


class PasswordResetRequest(APIView):
    serializer_class = ResetPasswordSerializer
    parser_classes = (JSONParser,)

    def post(self, request):
        """
            POST:
                email: str require
                domain: str require
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
        # Encode user id
        uuid = str(urlsafe_base64_encode(force_bytes(user.pk))).replace("b'", "").replace("'", "")
        # Url will be send to user, this will be replaced by real link
        detail = domain + 'email-confirm/' + uuid + '/' + token_key
        # Send email
        mail_status = auth_mail('Reset Password', detail, user.email)

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
    parser_classes = (JSONParser,)

    @staticmethod
    def post(request, uidb64, token_key):
        """
            POST:
            password1: str require
            password2: str require
            {"password1": "123456789hhccC", "password2": "123456789hhccC"}
        """
        if request.user.is_authenticated:
            return Response({
                'status': False,
                'messageCode': 'AU002',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)

        # init form with POST data
        serializer = PasswordSerializer(data=request.data)
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
            GET:url?uidb64=str&token_key=str
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
        user = get_or_none(User, pk=uid_int)
        if user is None:
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
        return Response({
            'status': True,
            'messageCode': 'RP004',
            'messageParams': {},
            'data': []
        }, status=status.HTTP_200_OK)


class RelifeJSONWebTokenAPIView(JSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = JSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        """
            POST:
                username: str require
                password: str require
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            formated_response = {
                'status': True,
                'messageCode': None,
                'messageParams': None,
                'data': response_data
            }
            response = Response(formated_response)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() + timedelta(hours=2))
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)
            return response
        formated_errors = {
            'status': False,
            'messageCode': 'AU003',
            'messageParams': None,
            'data': serializer.errors
        }
        return Response(formated_errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    parser_classes = (JSONParser,)

    def post(self, request):
        """
            POST:
                mail: str require
                username: str require
                password1: str require
                password2: str require
                domain: str require
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
        email = serializer.data['mail']
        username = serializer.data['username']
        domain = serializer.data['domain']
        user = User.objects.create(username=username, email=email, group=GroupUser())
        user.set_password(serializer.data['password1'])
        user.save()
        # Generate token
        token_key = default_token_generator.make_token(user)

        # Information for email, include: subject, link, from email and to
        # Encode user id
        uuid = str(urlsafe_base64_encode(force_bytes(user.pk))).replace("b'", "").replace("'", "")
        # Url will be send to user, this will be replaced by real link
        detail = domain + 'register-confirm/' + uuid + '/' + token_key
        # Send email
        mail_status = auth_mail("Registration confirm", detail, user.email)

        # Check ok
        if not mail_status:
            return Response({
                'status': False,
                'messageCode': 'MS001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            'status': True,
            'messageCode': 'RG001',
            'messageParams': {},
            'data': {'uuid': uuid, 'token': token_key}
        }, status=status.HTTP_201_CREATED)


class RegisterConfirmView(APIView):

    @staticmethod
    def get(request, uidb64, token_key):
        """
            Verify token_key and active account
            GET: url?uidb64=str&token_key=str
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
        user = get_or_none(User, pk=uid_int)
        if user is None:
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
        user.is_active = True
        user.save()
        return Response({
            'status': True,
            'messageCode': 'RG002',
            'messageParams': {},
            'data': []
        }, status=status.HTTP_200_OK)


class ReactiveView(APIView):
    serializer_class = ResetPasswordSerializer
    parser_classes = (JSONParser,)

    def post(self, request):
        """
            POST:
                email: str require
                domain: str require
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
        # Encode user id
        uuid = str(urlsafe_base64_encode(force_bytes(user.pk))).replace("b'", "").replace("'", "")
        # Url will be send to user, this will be replaced by real link
        detail = domain + 'register-confirm/' + uuid + '/' + token_key
        # Send email
        mail_status = auth_mail("Registration confirm", detail, user.email)

        # Check ok
        if not mail_status:
            return Response({
                'status': False,
                'messageCode': 'MS001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            'status': True,
            'messageCode': 'RG003',
            'messageParams': {},
            'data': {}
        }, status=status.HTTP_200_OK)


class NewMailConfirmView(APIView):

    @staticmethod
    def get(request, uidb64, email, token_key):
        """
            Verify token_key and change mail
            GET:url?uidb64=str&email=str&token_key=str
        """
        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        user = get_or_none(User, pk=uid_int)
        if user is None:
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
        user.email = str(urlsafe_base64_decode(email)).replace("b'", "").replace("'", "")
        user.save()
        return Response({
            'status': True,
            'messageCode': 'US006',
            'messageParams': {},
            'data': []
        }, status=status.HTTP_200_OK)
