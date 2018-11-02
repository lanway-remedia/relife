from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db import models

class Category(models.Model):

    name = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'category'
        ordering = ['created',]

class Tag(models.Model):

    name = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'tag'
        ordering = ['created',]

class OutletStore(models.Model):

    title = models.CharField(max_length = 255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='Images/outletstore/', default='')
    latitude = models.TextField()
    longitude = models.TextField()
    address = models.CharField(max_length =800)
    tel = models.CharField(max_length = 13)
    email = models.CharField(max_length = 100)
    zipcode = models.CharField(max_length = 8)
    area_of_premises = models.CharField(max_length = 50)
    start_time = models.DateTimeField(auto_now_add = False)
    end_time = models.DateTimeField(auto_now_add = False)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False)
    updated = models.DateTimeField(auto_now_add = False)
    class Meta:
        db_table = 'outlet_store'
        ordering = ['created',]

class OutletStoreTag(models.Model):

    outlet_store = models.ForeignKey(OutletStore, on_delete = models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete = models.CASCADE)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'outlet_store_tag'
        ordering = ['created',]

class OutletStoreMedia(models.Model):

    outlet_store = models.ForeignKey(OutletStore, on_delete = models.CASCADE)
    type_media = models.BooleanField()
    title = models.CharField(max_length = 255)
    description = models.TextField()
    url = models.CharField(max_length = 800)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'outlet_store_media'
        ordering = ['created',]

class OutletStoreComment(models.Model):

    outlet_store = models.ForeignKey(OutletStore, on_delete = models.CASCADE)
    user = models.ForeignKey('users.User', on_delete= models.CASCADE)
    comment = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True) 
    class Meta:
        db_table = 'outlet_store_comment'
        ordering = ['created',]

class OutletStoreCommentReply(models.Model):

    os_comment = models.ForeignKey(OutletStoreComment, on_delete = models.CASCADE)
    user = models.ForeignKey('users.User', on_delete= models.CASCADE)
    comment = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True) 
    class Meta:
        db_table = 'outlet_store_comment_reply'
        ordering = ['created',]