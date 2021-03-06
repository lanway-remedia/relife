"""
    Validate app
"""

from django.contrib.auth import get_user_model

User = get_user_model()


# USER VALIDATE
def email_exist(email):
    # If email already exist
    return User.objects.filter(email=email).first()


# USER VALIDATE


def username_exist(username):
    # If email already exist
    return User.objects.filter(username=username).first()
