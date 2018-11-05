from django.db import models
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

class ModernHouse(models.Model):
    
    title = models.CharField(max_length = 255)
    content = models.TextField()
    category = models.ForeignKey('outletstores.Category', on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='Images/ModernHouses/', default='')
    area_of_premises = models.CharField(max_length = 50)
    num_attend=models.IntegerField(max_length=5)
    price=models.FloatField()
    start_time = models.DateTimeField(auto_now_add = False)
    end_time = models.DateTimeField(auto_now_add = False)
    create_user=models.ForeignKey('users.User',on_delete=models.CASCADE)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False)
    updated = models.DateTimeField(auto_now_add = False)
    class Meta:
        db_table = 'modern_house'
        ordering = ['created',]

class ModernHouseUser(models.Model):
    
    user=models.ForeignKey('users.User',on_delete=models.CASCADE)
    moder_nhouse=models.ForeignKey(ModernHouse,on_delete=models.CASCADE)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False)
    updated = models.DateTimeField(auto_now_add = False)
    class Meta:
        db_table = 'modern_house_user'
        ordering = ['created',]

class ModernHouseTag(models.Model):

    modern_house = models.ForeignKey(ModernHouse, on_delete = models.CASCADE)
    tag = models.ForeignKey('outletstores.Tag', on_delete = models.CASCADE)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'modern_house_tag'
        ordering = ['created',]

class ModernHouseMedia(models.Model):

    modern_house = models.ForeignKey(ModernHouse, on_delete = models.CASCADE)
    type_media = models.BooleanField()
    title = models.CharField(max_length = 255)
    description = models.TextField()
    url = models.CharField(max_length = 800)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True)
    class Meta:
        db_table = 'modern_house_media'
        ordering = ['created',]

class ModernHouseOutletStore(models.Model):
    
    modern_house = models.ForeignKey(ModernHouse, on_delete=models.CASCADE)
    outlet_store=models.ForeignKey('outletstores.OutletStore',on_delete=models.CASCADE)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False)
    updated = models.DateTimeField(auto_now_add = False)
    class Meta:
        db_table = 'modern_house_outlet_store'
        ordering = ['created',]

class ModernHouseComment(models.Model):

    modern_house = models.ForeignKey(ModernHouse, on_delete = models.CASCADE)
    user = models.ForeignKey('users.User', on_delete= models.CASCADE)
    comment = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True) 
    class Meta:
        db_table = 'modern_house_comment'
        ordering = ['created',]

class ModernHouseCommentReply(models.Model):

    modern_house_comment = models.ForeignKey(ModernHouseComment, on_delete = models.CASCADE)
    user = models.ForeignKey('users.User', on_delete= models.CASCADE)
    comment = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add = False, blank = True)
    updated = models.DateTimeField(auto_now_add = False, blank = True) 
    class Meta:
        db_table = 'modern_house_comment_reply'
        ordering = ['created',]