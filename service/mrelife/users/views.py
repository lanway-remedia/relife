from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import ResetPasswordSerializer
from mrelife.users.serializers import UserSerializer
from mrelife.utils.relifepermissions import (SuperUserPermission)
from mrelife.utils.validates import email_exist
from rest_framework import status
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from url_filter.integrations.drf import DjangoFilterBackend

User = get_user_model()


class UserVs(ModelViewSet):
    """
    User Management
    Can filter group_id, username by adding parameter on url ?group_id=ID&username=STRING
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (SuperUserPermission,)
    # user
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['group_id', 'username']

    def create(self, request, *args, **kwargs):
        obj = super(UserVs, self).create(request, *args, **kwargs)
        group = request.data.get('group')
        if group is not None:
            group = Group.objects.get(pk=int(group))
            user = User.objects.get(pk=obj.data['id'])
            user.group = group
            user.save()
            obj.data['group'] = group.id
        return obj

    @list_route(methods=['post'])
    def update_email(self, request, *args, **kwargs):
        # validate data
        serializer = ResetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        email = serializer.data['mail']
        domain = serializer.data['domain']
        if email_exist(email):
            return Response({
                'status': False,
                'messageCode': 'US004',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_400_BAD_REQUEST)

        # Generate token
        token_key = default_token_generator.make_token(request.user)

        # Information for email, include: subject, link, from email and to
        # Encode user id
        uuid = str(urlsafe_base64_encode(force_bytes(request.user.pk))).replace("b'", "").replace("'", "")
        encode_mail = str(urlsafe_base64_encode(force_bytes(email))).replace("b'", "").replace("'", "")
        # Url will be send to user, this will be replaced by real link
        detail = domain + 'new-email-confirm/' + uuid + '/' + encode_mail + '/' + token_key
        # Send email
        mail_status = auth_mail('Change email', detail, email)

        # Check mail sending ok
        if not mail_status:
            return Response({
                'status': False,
                'messageCode': 'MS001',
                'messageParams': {},
                'data': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            'status': True,
            'messageCode': 'US005',
            'messageParams': {},
            'data': {}
        }, status=status.HTTP_200_OK)
