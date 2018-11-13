from rest_framework import permissions

from mrelife.utils.groups import GroupAdmin, GroupStore, GroupSub, GroupUser


class SuperUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


class AdminPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.group == GroupAdmin()
        except Exception:
            return False


class StoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.group == GroupStore()
        except Exception:
            return False


class SubStoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.group == GroupSub()
        except Exception:
            return False


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.group == GroupUser()
        except Exception:
            return False
