from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.serializers import CharField, ModelSerializer, Serializer, ValidationError

from mrelife.outletstores.models import OutletStore
from mrelife.utils.groups import GroupAdmin, GroupSub, GroupUser, IsAdmin, IsStore
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

    class Meta:
        model = User
        exclude = ('groups',)

    def validate_group(self, group):
        try:
            if(IsStore(self.context.get('user'))):
                if group:
                    if not group == GroupSub():
                        print(group)
                        raise serializers.ValidationError("not permission! create")
        except KeyError as e:
            pass
        return group

    def validate(self, data):
        try:
            # raise ValidationError({"store": ['store not None']})
            user_create=self.context.get('user')
            if(IsAdmin(user_create)):
                
                if  data['group'] == GroupUser() or data['group'] == GroupAdmin :
                    raise serializers.ValidationError({"store": ['store not None2']})
                    # data['store'] = None
                else:
                    store=None
                    try:
                        store=data['store']
                    except Exception as e:
                        pass
                    if True:
                        if not store:
                            raise serializers.ValidationError({"store": ['store not None222']})
            if(IsStore(user_create)):
                data['group']=GroupSub()
                data['store']=user_create.store
        except KeyError as e:
            pass
        return data


class GroupShowSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = ('id', 'name')


class UserShowSerializer(ModelSerializer):
    store = OutletStoreSerializer(read_only=True)
    group = GroupShowSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ('groups', 'user_permissions')
