from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView

from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import LoginSerializer, RegisterV2Serializer
from mrelife.utils.groups import GroupUser
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_503
from mrelife.utils.validates import email_exist
from mrelife.authenticates.lanway_portal import lanway_register
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

User = get_user_model()


class JWTLoginView(JSONWebTokenAPIView):
    """
        Version 2:
        Login verify with lanway DB
    """
    serializer_class = JSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        """
            POST:
                username: str require
                password: str require
        """
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return response_400('AU003', '', serializer.errors)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return response_400('AU003', '', serializer.errors)

        user = serializer.object.get('user') or request.user
        token = serializer.object.get('token')
        response_data = jwt_response_payload_handler(token, user, request)
        response = response_200('AU004', '', response_data)
        if api_settings.JWT_AUTH_COOKIE:
            expiration = (datetime.utcnow() + timedelta(hours=2))
            response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                token,
                                expires=expiration,
                                httponly=True)
        return response


class RegisterV2View(APIView):
    """
        Version 2:
        Registration have confirm from Lanway DB
    """
    serializer_class = RegisterV2Serializer
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
            return response_400('AU002')
        # init form with POST data
        serializer = self.serializer_class(data=request.data)
        # validate
        if not serializer.is_valid():
            response_400('RG004', '', serializer.errors)

        created, detail = lanway_register({
            "last_name": serializer.data['last_name'],
            "first_name": serializer.data['first_name'],
            "birthday": serializer.data['birth_date'],
            "email": serializer.data['mail'],
            "password": serializer.data['password1']
        })
        if not created:
            response_400('RG004', '', detail)
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
            return response_503('MS001')
        return response_201('RG001', '', {'uuid': uuid, 'token': token_key})
