"""
    Reuseable Function to call Lanway Endpoint
"""
import requests
from django.conf import settings
from django.contrib.auth import get_user_model

from mrelife.utils.validates import username_exist

LANWAY_BASE_URL = settings.LANWAY_BASE_URL
LANWAY_LOGIN_URL = 'api/v1/services/relife/users/actions/login/'
LANWAY_REGISTER_URL = 'api/v1/services/relife/users/'
LANWAY_VALIDATE_URL = 'api/v1/services/relife/users/actions/inquiry/'
LANWAY_EDIT_USER_URL = 'api/v1/services/relife/users/{}/'
User = get_user_model()


def lanway_login(username, password):
    """
        Login to Lanway
    """
    reponse = requests.post(LANWAY_BASE_URL + LANWAY_LOGIN_URL, data={"email": username, "password": password})
    if reponse.status_code > 299:
        return (False, reponse.json()['detail']['error_code'])
    user, created = User.objects.get_or_create(username=username, email=username, is_active=True)
    if created:
        user.set_password(password)
        user.save()
    return (True, reponse.json()['detail'])


def lanway_register(data):
    """
        Register to Lanway
    """
    register_data = {
        "last_name": data['last_name'],
        "first_name": data['first_name'],
        "birthday": data['birthday'],
        "email": data['email'],
        "password": data['password']}
    reponse = requests.post(LANWAY_BASE_URL + LANWAY_LOGIN_URL, data=register_data)
    if reponse.status_code > 299:
        return (False, reponse.json()['detail']['error_code'])
    return (True, reponse.json()['detail'])


def lanway_edit_user_password(data):
    """
        Update user password
    """
    validate_data = {"email": data}
    reponse = requests.post(LANWAY_BASE_URL + LANWAY_EDIT_USER_URL.format(data.uuid), data=validate_data)
    if reponse.status_code > 299:
        return False
    return True


def lanway_user_exist(email):
    """
        Validate User exist on Lanway
    """
    prefare_data = {"email": email}
    reponse = requests.post(LANWAY_BASE_URL + LANWAY_VALIDATE_URL, data=prefare_data)
    if reponse.status_code == 200:
        if not username_exist(email):
            User.objects.create(username=email, email=email, is_active=True,
                                first_name=reponse.json()['detail']['first_name'])
        return (True, reponse.json()['detail'])
    return (False, reponse.json()['detail']['error_code'])
