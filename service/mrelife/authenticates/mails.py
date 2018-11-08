from django.core.mail import send_mail
from django.conf import settings

def auth_mail(subject, detail, mail):
    return send_mail(subject, detail, settings.DEFAULT_FROM_EMAIL, [mail])
