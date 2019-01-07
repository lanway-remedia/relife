"""
    User version 1
"""
from datetime import datetime, timedelta
from rest_framework.generics import GenericAPIView

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView

from mrelife.authenticates.lanway_portal import lanway_edit_user_password
from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import PasswordSerializer, RegisterSerializer, ResetPasswordSerializer
from mrelife.utils.groups import GroupUser
from mrelife.utils.querys import get_or_none
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_503
from mrelife.utils.validates import email_exist
from mrelife.users.serializers import UserSerializer

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
            return response_400('AU002')
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return response_400('AU005', '', serializer.errors)
        email = serializer.data['mail']
        domain = serializer.data['domain']
        # Get user by email
        user = email_exist(email)
        if not user:
            return response_404('US001')

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
        if not mail_status:
            return response_503('MS001')
        return response_200('RP001', '', {'uuid': uuid, 'token': token_key})


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
            return response_400('AU002')

        # init form with POST data
        serializer = PasswordSerializer(data=request.data)
        # validate
        if not serializer.is_valid():
            return response_400('', '', serializer.errors)

        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        # get user
        user = User.objects.filter(pk=uid_int).first()
        if not user:
            return response_404('US001')
        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return response_400('RP002')
        # set new password
        user.set_password(serializer.data['password1'])
        user.save()
        lanway_edit_user_password({'uuid': user.lanway_id, 'password': serializer.data['password1']})
        return response_200('RP003')

    @staticmethod
    def get(request, uidb64, token_key):
        """
            Verify token_key before allow user create new password
            GET:url?uidb64=str&token_key=str
        """
        if request.user.is_authenticated:
            return response_400('AU002')

        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        user = get_or_none(User, pk=uid_int)
        if user is None:
            return response_404('US001')
        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return response_400('RP002')
        return response_200('RP004')


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

        if not serializer.is_valid():
            return response_400('AU003', '', serializer.errors)
        user = serializer.object.get('user') or request.user
        token = serializer.object.get('token')
        response_data = jwt_response_payload_handler(token, user, request)
        response_data['user'] = UserSerializer(user).data
        response = response_200('', '', response_data)
        if api_settings.JWT_AUTH_COOKIE:
            expiration = (datetime.utcnow() + timedelta(hours=2))
            response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                token,
                                expires=expiration,
                                httponly=True)
        return response


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    parser_classes = (JSONParser,)

    def post(self, request):
        """
            POST:
                mail: str require
                username: str require
                first_name:  str require
                last_name :  str require
                password1: str require
                password2: str require   
                domain: str require
        """
        if request.user.is_authenticated:
            return response_400('AU002')
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return response_400('RG005', '', serializer.errors)
        email = serializer.data['mail']
        username = serializer.data['username']
        domain = serializer.data['domain']
        firstname = serializer.data['first_name']
        lastname = serializer.data['last_name']
        user = User.objects.create(username=username, email=email, group=GroupUser(),
                                   first_name=firstname, last_name=lastname)
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
            return response_503('MS001')
        return response_201('RG001', '', {'uuid': uuid, 'token': token_key})


class RegisterConfirmView(APIView):

    @staticmethod
    def get(request, uidb64, token_key):
        """
            Verify token_key and active account
            GET: url?uidb64=str&token_key=str
        """
        if request.user.is_authenticated:
            return response_400('AU002')

        # Decode user id
        uid_int = urlsafe_base64_decode(uidb64)
        user = get_or_none(User, pk=uid_int)
        if user is None:
            return response_404('US001')
        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return response_400('RP002')
        user.is_active = True
        user.save()
        return response_200('RG002')


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
            return response_400('AU002')
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            return response_400('RG006', '', serializer.errors)
        email = serializer.data['mail']
        domain = serializer.data['domain']
        # Get user by email
        user = email_exist(email)
        if not user:
            return response_404('US001')

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
            return response_503('MS001')
        return response_200('RG003')


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
            return response_404('US001')

        # Validate token
        # False if wrong or expire
        token_key = default_token_generator.check_token(user, token_key)
        if not token_key:
            return response_400('RP002')
        user.email = str(urlsafe_base64_decode(email)).replace("b'", "").replace("'", "")
        user.save()
        return response_200('US006')
