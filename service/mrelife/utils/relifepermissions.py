from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser, GroupAdmin


class SuperUserPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


class AdminPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsAdmin(request.user)
        except Exception:
            return False


class StoreManagerPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsStore(request.user)
        except Exception:
            return False


class SubStoreManagerPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsSub(request.user)
        except Exception:
            return False


class UserPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsUser(request.user)
        except Exception:
            return False


class AdminOrStoreOrDenyPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsAdmin(request.user) or IsStore(request.user)
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if IsAdmin(request.user):
            return True
        if obj.group == GroupAdmin():
            return False
        return IsStore(request.user) and obj.store == request.user.store
