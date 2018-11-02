from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db import models

class User(AbstractUser):

    birth_date = models.DateTimeField(auto_now_add = False, null= True, blank = True)
    address = models.CharField(max_length = 800, null= True, blank = True)
    tel = models.CharField(max_length = 13, null = True, blank = True)
    zipcode = models.CharField(max_length = 8, null = True, blank = True)
    class Meta:
        ordering = ['date_joined',]

class RepresentSubAcc(models.Model):

    represent_user_id = models.IntegerField()
    sub_user_id = models.IntegerField()
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'represent_sub_acc'
        ordering = ['created',]

