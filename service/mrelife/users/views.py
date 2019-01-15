"""
    User Module
    By Bin Nguyen
"""
from datetime import datetime

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.tokens import default_token_generator
from django.core.files.storage import default_storage
from django.db.models import Q
from django.http import Http404
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.decorators import list_route
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from mrelife.authenticates.mails import auth_mail
from mrelife.authenticates.serializers import ResetPasswordSerializer
from mrelife.commons.common_fnc import CommonFuntion
from mrelife.file_managements.serializers import FileSerializer
from mrelife.outletstores.models import OutletStore
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.users.serializers import (PasswordSerializer, ProfileSerializer,
                                       ShowProfileSerializer,
                                       UserRequestSerializer, UserSerializer,
                                       UserShowSerializer,
                                       UserWithoutRequireInfoSerializer)
from mrelife.utils.bc_store_owner_permission import BecomStoreOwnerPermision
from mrelife.utils.groups import GroupUser, IsStore,GroupSub
from mrelife.utils.querys import get_or_none
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.relifepermissions import AdminOrStoreOrDenyPermission
from mrelife.utils.response import (response_200, response_201, response_400,
                                    response_404, response_405, response_503)
from mrelife.utils.validates import email_exist
from url_filter.integrations.drf import DjangoFilterBackend
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
User = get_user_model()


class UserVs(ModelViewSet):
    """
    User Management
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, AdminOrStoreOrDenyPermission,)
    pagination_class = LimitOffsetPagination
    # user
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['group_id', 'username', 'first_name', 'last_name', 'store_id']
    @method_decorator(name='create', decorator=swagger_auto_schema(request_body=UserRequestSerializer))
    def list(self, request, *args, **kwargs):
        """
            Can filter group_id, username by adding parameter on url
            GET: ?group_id=INT&username=STRING&store_id=INT
            ?name=STRING => Search like in username, first_name, last_name
        """
        group = request.user.group
        if IsStore(request.user):  # group store admin
            self.queryset = User.objects.filter(group=group)
        name = request.GET.get('name')
        if name is not None:
            self.queryset = self.queryset.filter(Q(username__contains=name) | Q(
                first_name__contains=name) | Q(last_name__contains=name))
        response = super(UserVs, self).list(request, *args, **kwargs)
        return response_200('US200', '', response.data)

    def retrieve(self, request, *args, **kwargs):
        try:
            return super(UserVs, self).retrieve(request, *args, **kwargs)
        except Http404:
            return response_404('US404')

    def create(self, request, *args, **kwargs):
        try:
            data=request.data
            print(data)
            serializer = UserRequestSerializer(data=data, context={'user': request.user})
            if serializer.is_valid():
                serializer.save()
                user = User.objects.get(id=serializer.data['id'])
                user.set_password(user.password)
                user.save()
                if not (user.group):
                    user.group=GroupUser()
                    if IsStore(request.user):
                        user.group=GroupSub()
                    user.save()
                return Response(CommonFuntion.resultResponse(True, UserShowSerializer(user).data, MessageCode.US111.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.US222.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
                return Response(CommonFuntion.resultResponse(False, {"err":e}, MessageCode.US333.value, {}), status=status.HTTP_400_BAD_REQUEST)

        # """
        #  POST:
        #         mail: str require
        #         username: str require
        #         first_name:  str require
        #         last_name :  str require
        #         password1: str require
        #         password2: str require
        #         birth_date: str
        #         address: str
        #         group: int
        #         store: int
        #         other field is optional
        # """
        # try:
        #     response = super(UserVs, self).create(request, *args, **kwargs)
        #     user = User.objects.get(pk=response.data['id'])
        # except Http404:
        #     return response_404('US404')
        # group = request.user.group
        # if not IsStore(request.user):
        #     try:
        #         group = Group.objects.get(pk=int(request.data.get('group')))
        #     except Exception:
        #         group = GroupUser()
        #     try:
        #         store = OutletStore.objects.get(pk=int(request.data.get('store')))
        #     except Exception:
        #         store = None
        # else:
        #     store = request.user.store
        # user.group = group
        # user.store = store
        # user.save()
        # response.data['group'] = group.id
        # if store is not None:
        #     response.data['store'] = store.id
        # return response_201('US', '', response.data)

    def update(self, request, *args, **kwargs):
        """
            POST:
                email: not changing with this action
                password: not changing with this action
                username: not changing with this action
        """
        try:
            self.serializer_class = UserWithoutRequireInfoSerializer
            return super(UserVs, self).update(request, *args, **kwargs)
        except Http404:
            return response_404('US404')

    def partial_update(self, request, *args, **kwargs):
        try:
            return super(UserVs, self).partial_update(request, *args, **kwargs)
        except Http404:
            return response_404('US404')

    def destroy(self, request, *args, **kwargs):
        try:
            return super(UserVs, self).destroy(request, *args, **kwargs)
        except Http404:
            return response_404('US404')


class ProfileVs(CreateModelMixin, ListModelMixin, GenericViewSet):
    """
    User Management
    Update profile only
    """
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        try:
            obj = User.objects.get(pk=request.user.id)
            serializer = ShowProfileSerializer(obj)
            return response_200('US200', '', serializer.data)
        except Http404:
            return response_404('PP404')

    def create(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        serializer = ProfileSerializer(user, data=request.data)
        if not serializer.is_valid():
            return response_405('US010', '', serializer.errors)
        serializer.save()
        return response_200('US011', '', serializer.data)

    @list_route(methods=['post'])
    def update_email(self, request, *args, **kwargs):
        """
            POST:
                email: str require
                domain: str require
        """
        # validate data
        serializer = ResetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return response_405('US010', '', serializer.errors)
        email = serializer.data['mail']
        domain = serializer.data['domain']
        if email_exist(email):
            return response_400('US004', '', serializer.errors)

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
            return response_503('MS001')
        return response_200('US005')

    @list_route(methods=['post'])
    def update_avatar(self, request, *args, **kwargs):
        """
            POST:
                file: File
        """
        user = User.objects.get(pk=request.user.id)
        self.parser_class = (FormParser, MultiPartParser)
        self.serializer_class = FileSerializer

        file_serializer = FileSerializer(data=request.data)
        if not file_serializer.is_valid():
            return response_405('FM002', '', file_serializer.errors)
        f = request.data['file']
        file = default_storage.save(f.name, f)
        user.profile_image = f.name
        user.save()
        serializer = UserSerializer(user)
        return response_200('US009', '', serializer.data)

    @list_route(methods=['post'])
    def update_password(self, request, *args, **kwargs):
        """
            POST:
                password: str require
                password1: str require
                password2: str require
        """
        user = User.objects.get(pk=request.user.id)

        serializer = PasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return response_405('US013', '', serializer.errors)

        if not user.check_password(serializer.data['password']):
            return response_400('US012')

        user.set_password(serializer.data['password1'])
        user.save()
        return response_200('US014', '', serializer.data)


class BecomeOwner(GenericAPIView, CreateModelMixin):
    serializer_class = OutletStoreSerializer
    permission_classes = (IsAuthenticated, BecomStoreOwnerPermision)

    def post(self, request, *args, **kwargs):
        try:
            serializer = OutletStoreSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                User.objects.filter(id=request.user.id).update(store_id=serializer.data['id'], group_id=2)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.BSO003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.BSO010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, {"err":e}, MessageCode.BSO004.value, {}), status=status.HTTP_400_BAD_REQUEST)
