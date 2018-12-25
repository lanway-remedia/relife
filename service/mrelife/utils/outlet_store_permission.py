from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class OutletStorePermission(BasePermission):

    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve"]):
                return True
            return (IsStore(request.user) or IsAdmin(request.user))
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if  IsAdmin(request.user):
            return True
        return (request.user.is_authenticated() and IsStore(request.user)) 
class OutletStoreContactPermission(BasePermission):
    def has_permission(self, request, view):
        try:
            return (IsStore(request.user) or IsAdmin(request.user))
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if  IsAdmin(request.user):
            return True
        return (request.user.is_authenticated() and IsStore(request.user)) 