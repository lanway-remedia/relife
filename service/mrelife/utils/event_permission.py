from rest_framework.permissions import BasePermission

from mrelife.users.models import User
from mrelife.utils.groups import IsAdmin, IsStore, IsSub, IsUser


class EventPermission(BasePermission):

    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve"]):
                return True
            return (IsStore(request.user) or IsAdmin(request.user))
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        if IsAdmin(request.user):
            return True
        return IsStore(request.user)


class EventContactPermission(BasePermission):
    def has_permission(self, request, view):
        try:
            return User.objects.filter(id=request.user.id).exists()
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        return User.objects.filter(id=request.user.id).exists()


class EventViewPermission(BasePermission):
    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve", "getlistbyexamplehouse"]):
                return True
            return User.objects.filter(id=request.user.id).exists()
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        return User.objects.filter(id=request.user.id).exists()
class EventModelhousePermission(BasePermission):
    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve"]):
                return True
            return User.objects.filter(id=request.user.id).exists()
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        return IsAdmin(request.user) or IsStore(request.user)
class EventExhibitionPermission(BasePermission):
    def has_permission(self, request, view):
        try:
            if(view.action in ["list", "retrieve"]):
                return True
            return User.objects.filter(id=request.user.id).exists()
        except Exception:
            return False

    def has_object_permission(self, request, view, obj):
        return IsAdmin(request.user) or IsStore(request.user)
