from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class ExampleHousePermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsAdmin(request.user) or IsStore(request.user) or IsSub(request.user)
        except Exception:
            return False
