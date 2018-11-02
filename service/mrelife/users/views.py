from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from mrelife.users.serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from mrelife.utils.relifepermissions import SuperUserPermission, AdminPermission
from rest_framework_jwt.views import JSONWebTokenAPIView
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import (
    JSONWebTokenSerializer
)
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER
from datetime import datetime
from mrelife.utils.relifeenum import MessageCode

User = get_user_model()

# Create your views here.
class RelifeJSONWebTokenAPIView(JSONWebTokenAPIView):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            formated_response = {
                'status': False,
                'messageCode': None,
                'messageParams': None,
                'data': response_data
            }
            response = Response(formated_response)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)
            return response
        formated_errors = {
            'status': False,
            'messageCode': MessageCode.AU001.value,
            'messageParams': None,
            'data': serializer.errors
        }
        return Response(formated_errors, status=status.HTTP_400_BAD_REQUEST)

class RelifeObtainJSONWebToken(RelifeJSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = JSONWebTokenSerializer

custom_obtain_jwt_token = RelifeObtainJSONWebToken.as_view()

@api_view(('GET',))
@permission_classes((AdminPermission, ))
def example_view(request, format=None):
    reponse = {
        'data': 'something'
    }
    return Response(reponse)

class UserVs(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (SuperUserPermission, )

    def list(self, request, *args, **kwargs):
        return super(UserVs, self).list(request, *args, **kwargs)