from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class OrderMHViewadminPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve"]):
                return IsAdmin(request.user) or IsStore(request.user)
            elif view.action in ["create", "update", "selfGetlistBooking","updateStatus"]:
                return   IsAdmin(request.user) or IsUser(request.user) 
            elif view.action in ["destroy"]:
                return   IsAdmin(request.user)
            else:
                return False
        except Exception:
            return False
    def has_object_permission(self, request, view, obj):
        return IsAdmin(request.user) or IsUser(request.user)


class OrderMHUserListPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsUser(request.user)
        except Exception:
            return False
