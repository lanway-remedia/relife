from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from mrelife.users.serializers import UserSerializer

User = get_user_model()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class UserVs(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        return super(UserVs, self).list(request, *args, **kwargs)
