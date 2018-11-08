from django.contrib.auth.models import Group
from django.core.cache import cache


def GroupAdmin():
    data = cache.get('GroupAdmin')
    if not data:
        data = Group.objects.get(name='admin')
        cache.set('GroupAdmin', data, 86400)
    return data


def GroupStore():
    data = cache.get('GroupStore')
    if not data:
        data = Group.objects.get(name='store_manager')
        cache.set('GroupStore', data, 86400)
    return data


def GroupSub():
    data = cache.get('GroupSub')
    if not data:
        data = Group.objects.get(name='sub_store_manager')
        cache.set('GroupSub', data, 86400)
    return data


def GroupUser():
    data = cache.get('GroupUser')
    if not data:
        data = Group.objects.get(name='user')
        cache.set('GroupUser', data, 86400)
    return data
