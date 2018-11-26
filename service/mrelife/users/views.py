from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.tokens import default_token_generator
from django.core.files.storage import default_storage
from django.db.models import Q
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.decorators import list_route
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import ResetPasswordSerializer
from mrelife.file_managements.serializers import FileSerializer
from mrelife.outletstores.models import OutletStore
from mrelife.users.serializers import (PasswordSerializer, ProfileSerializer,
                                       UserSerializer,
                                       UserWithoutRequireInfoSerializer)
from mrelife.utils.groups import GroupUser, IsStore
from mrelife.utils.querys import get_or_none
from mrelife.utils.relifepermissions import AdminOrStoreOrDenyPermission
from mrelife.utils.validates import email_exist
from url_filter.integrations.drf import DjangoFilterBackend

User = get_user_model()


class UserVs(ModelViewSet):
    """
    User Management
    Can filter group_id, username by adding parameter on url ?group_id=ID&username=STRING
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, AdminOrStoreOrDenyPermission,)
    pagination_class = LimitOffsetPagination
    # user
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['group_id', 'username', 'first_name', 'last_name']

    def list(self, request, *args, **kwargs):
        group = request.user.group
        if IsStore(request.user):  # group store admin
            self.queryset = User.objects.filter(group=group)
        name = request.GET.get('name')
        if name is not None:
            self.queryset = self.queryset.filter(Q(username__contains=name) | Q(
                first_name__contains=name) | Q(last_name__contains=name))
        return super(UserVs, self).list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        obj = super(UserVs, self).create(request, *args, **kwargs)
        user = User.objects.get(pk=obj.data['id'])
        group = request.user.group
        if not IsStore(request.user):
            try:
                group = Group.objects.get(pk=int(request.data.get('group')))
                store = OutletStore.objects.get(pk=int(request.data.get('store')))
            except Exception:
                group = GroupUser()
                store = None
        else:
            store = request.user.store
        user.group = group
        user.store = store
        user.save()
        obj.data['group'] = group.id
        if store is not None:
            obj.data['store'] = store.id
        return obj

    def update(self, request, *args, **kwargs):
        self.serializer_class = UserWithoutRequireInfoSerializer
        return super(UserVs, self).update(request, *args, **kwargs)


class ProfileVs(CreateModelMixin, ListModelMixin, GenericViewSet):
    """
    User Management
    Update profile only
    """
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        serializer = ProfileSerializer(user, data=request.data)
        if not serializer.is_valid():
            return Response({
                'status': False,
                'messageCode': 'US010',
                'messageParams': {},
                'data': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({
            'status': True,
            'messageCode': 'US011',
            'messageParams': {},
            'data': serializer.data
        }, status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        serializer = UserSerializer(user)

        return Response({
            'status': True,
            'messageCode': 'US007',
            'messageParams': {},
            'data': serializer.data
        }, status.HTTP_200_OK)

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

    @list_route(methods=['post'])
    def update_avatar(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        self.parser_class = (FormParser, MultiPartParser)
        self.serializer_class = FileSerializer

        file_serializer = FileSerializer(data=request.data)
        if not file_serializer.is_valid():
            return Response({
                'status': False,
                'messageCode': 'FM002',
                'messageParams': {},
                'data': file_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        f = request.data['file']
        file = default_storage.save(f.name, f)
        user.profile_image = f.name
        user.save()
        serializer = UserSerializer(user)

        return Response({
            'status': True,
            'messageCode': 'US009',
            'messageParams': {},
            'data': serializer.data
        }, status.HTTP_200_OK)

    @list_route(methods=['post'])
    def update_password(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)

        serializer = PasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'status': False,
                'messageCode': 'US013',
                'messageParams': {},
                'data': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(serializer.data['password']):
            return Response({
                'status': False,
                'messageCode': 'US012',
                'messageParams': {},
                'data': {}
            }, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.data['password1'])
        user.save()
        return Response({
            'status': True,
            'messageCode': 'US014',
            'messageParams': {},
            'data': serializer.data
        }, status.HTTP_200_OK)
