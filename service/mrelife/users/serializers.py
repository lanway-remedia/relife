from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.serializers import (CharField, ModelSerializer, Serializer,
                                        ValidationError)

from mrelife.outletstores.models import OutletStore
from mrelife.utils.groups import GroupUser, IsStore,GroupSub
from mrelife.utils.validates import email_exist

User = get_user_model()


class OutletStoreSerializer(ModelSerializer):

    class Meta:
        model = OutletStore
        fields = '__all__'


class UserSerializer(ModelSerializer):
    store = OutletStoreSerializer(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def validate(self, attrs):
        """
        Check that email exists in system
        """
        if email_exist(attrs['email']):
            raise ValidationError("US004")
        return attrs

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserWithoutRequireInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'username', 'email')


class ShowProfileSerializer(ModelSerializer):
    store = OutletStoreSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ('password',)


class ProfileSerializer(ModelSerializer):
    store = OutletStoreSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ('password', 'username')


class PasswordSerializer(Serializer):
    """
    Serializer for password change endpoint.
    """
    password = CharField(required=True)
    password1 = CharField(required=True)
    password2 = CharField(required=True)

    def validate(self, attrs):
        """
        Check that the 2 password is the same.
        """
        # TODO: Change error message
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("US002")
        return attrs


class UserRequestSerializer(ModelSerializer):
    store = serializers.PrimaryKeyRelatedField(
        queryset=OutletStore.objects.filter(is_active=1), required=False, allow_null=True)
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), required=False, allow_null=True)
    # user_permissions=serializers.IntegerField(read_only=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields =  '__all__'
    # def validate_group(self, group):
    #     request = getattr(self.context, 'request', None)
    #     if True:
    #         if not True:
    #             raise  serializers.ValidationError("not permission! create")
    #     return GroupUser()
    # def validate(self, data):
    #     # Check that the start time, end time.
    #     try:
    #         if data['group']=="3":
    #             raise serializers.ValidationError("not permission! create")
    #     except KeyError as e:
    #         pass
    #     return data
class GroupShowSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = ('id', 'name')


class UserShowSerializer(ModelSerializer):
    store = OutletStoreSerializer(read_only=True)
    group=GroupShowSerializer(read_only=True)
    class Meta:
        model = User
        exclude = ('groups', 'user_permissions')
