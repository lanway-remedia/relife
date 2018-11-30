import os

from django.contrib.auth.models import AbstractUser, Group
from django.core.files.storage import default_storage as storage
from django.db.models import (
    CASCADE,
    SET_NULL,
    BooleanField,
    CharField,
    DateTimeField,
    ForeignKey,
    ImageField,
    IntegerField,
    Model,
    TextField
)
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from PIL import Image


class Category(Model):
    name = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'category'
        ordering = ['order', ]


class SubCategory(Model):
    category = ForeignKey(Category, related_name='sub_categories', on_delete=CASCADE)
    name = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'sub_category'
        ordering = ['order', ]
        
    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)
