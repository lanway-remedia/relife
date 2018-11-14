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


class AdminOrStoreOrDenyPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.group == GroupAdmin() or request.user.group == GroupStore()
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if request.user.group == GroupAdmin():
            return True
        if obj.group == GroupAdmin():
            return False
        return request.user.group == GroupStore() and obj.store == request.user.store
