from rest_framework import permissions
from mrelife.utils.groups import GroupAdmin, GroupStore, GroupSub, GroupUser


class SuperUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


class AdminPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.group == GroupAdmin()


class StoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.group == GroupStore()


class SubStoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.group == GroupSub()


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.group == GroupUser()
