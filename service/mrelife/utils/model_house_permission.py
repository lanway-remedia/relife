from rest_framework.permissions import BasePermission

from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class ModelHousePermission(BasePermission):

    def has_permission(self, request, view):
        try:
            return IsAdmin(request.user) or IsStore(request.user) or IsSub(request.user)
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if IsAdmin(request.user):
            return True
        return (IsStore(request.user) or IsSub(request.user)) and request.user.own_model_house.filter(model_house=obj).exists()
