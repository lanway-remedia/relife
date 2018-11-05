from django.contrib.auth.models import AbstractUser, Group
from django.db.models import (SET_NULL, BooleanField, CharField, DateTimeField,
                              ForeignKey, ImageField, IntegerField, Model)
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    birth_date = DateTimeField(auto_now_add=False, null=True, blank=True)
    address = CharField(max_length=800, null=True, blank=True)
    tel = CharField(max_length=13, null=True, blank=True)
    zipcode = CharField(max_length=8, null=True, blank=True)
    group = ForeignKey(Group, related_name='users', null=True, on_delete=SET_NULL)
    profile_image = ImageField(null=True, blank=True)

    class Meta:
        ordering = ['date_joined', ]


class RepresentSubAcc(Model):

    represent_user_id = IntegerField()
    sub_user_id = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'represent_sub_acc'
        ordering = ['created', ]
