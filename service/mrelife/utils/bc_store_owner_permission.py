from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class BecomStoreOwnerPermision(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsUser(request.user)
        except Exception:
            return False
