from rest_framework import permissions


class SuperUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


class AdminPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name='admin').exists()


class StoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name='store_manager').exists()


class SubStoreManagerPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name='sub_store_manager').exists()


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name='user').exists()
