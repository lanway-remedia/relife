from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class OrderMHViewadminPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            if(view.action == "list"):
                return IsAdmin(request.user) or IsStore(request.user) or IsSub(request.user)
            else:
                return False
        except Exception:
            return False


class OrderMHUserListPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsUser(request.user)
        except Exception:
            return False

    # def has_object_permission(self, request, view, obj):
    #     if IsUser(request.user):
    #         return True
    #     return False
        # and request.user.outletstore_user.filter(outlet_store=obj).exists()
