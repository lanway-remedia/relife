import os
from io import BytesIO

from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group
from django.core.files.storage import default_storage as storage
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import (CASCADE, SET_NULL, BooleanField, CharField,
                              DateTimeField, ForeignKey, ImageField,
                              IntegerField, Model, TextField)
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from PIL import Image

from mrelife.locations.models import City


class OutletStore(Model):
    title = CharField(max_length=255)
    slogan_title=CharField(max_length=255,null=True)
    slogan_content=CharField(max_length=255,null=True)
    type=IntegerField(default=1)
    content = TextField()
    img_thumbnail = CharField(max_length=800, null=True)
    img_large = ImageField(upload_to='outletimag/', null=True, blank=True)
    latitude = TextField(null=True)
    longitude = TextField(null=True)
    zipcode = CharField(max_length=8, null=True)
    address = CharField(max_length=800)
    city = ForeignKey(City, related_name="outlet_dict", on_delete=CASCADE, null=True, blank=True)
    tel = CharField(max_length=13)
    email = CharField(max_length=100)
    establish=DateTimeField(auto_now_add=False,null=True)
    charter_capital=IntegerField(default=1)
    employee_total=IntegerField(default=1)
    qualification=CharField(max_length=255,null=True)
    permit_number=CharField(max_length=255,null=True)
    construction_area=CharField(max_length=255,null=True)
    construction_result=CharField(max_length=255,null=True)
    min_price=IntegerField(default=1)
    max_price=IntegerField(default=1)
    time_serving = CharField(max_length=255, null=True)
    create_user = ForeignKey('users.User', on_delete=CASCADE, null=True)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)
    class Meta:
        db_table = 'outlet_store'
        ordering = ['created', ]

    def save(self, *args, **kwargs):
        if not self.pk:
            super(OutletStore, self).save(*args, **kwargs)
            self.img_thumbnail = self.create_img_thumbnail()
            self.save()
        else:
            self.img_thumbnail = self.create_img_thumbnail()
            super(OutletStore, self).save(*args, **kwargs)

    def create_img_thumbnail(self):
        if not self.img_large:
            return None
        file_path = self.img_large.name
        filename_base, filename_ext = os.path.splitext(file_path)
        thumb_file_path = "%s_thumb.jpg" % filename_base
        if storage.exists(thumb_file_path):
            return storage.url(thumb_file_path)
        try:
            # resize the original image and return url path of the thumbnail
            f = storage.open(file_path, 'r')
            image = Image.open(f)
            width, height = image.size

            if width > height:
                delta = width - height
                left = int(delta/2)
                upper = 0
                right = height + left
                lower = height
            else:
                delta = height - width
                left = 0
                upper = int(delta/2)
                right = width
                lower = width + upper

            image = image.crop((left, upper, right, lower))
            image = image.resize((50, 50), Image.ANTIALIAS)

            f_thumb = storage.open(thumb_file_path, "w")
            out_im2 = BytesIO()
            image.save(out_im2, "JPEG")
            f_thumb.write(out_im2.getvalue())
            f_thumb.close()
            if storage.exists(thumb_file_path):
                return storage.url(thumb_file_path)
            return None
        except:
            return None


class OutletStoreContact(Model):
    outlet_store = ForeignKey(OutletStore, related_name='outlet_store_contact', on_delete=CASCADE)
    name = CharField(max_length=255)
    name_kana = CharField(max_length=255)
    zipcode = CharField(max_length=8)
    address = CharField(max_length=800)
    email = CharField(max_length=255)
    tel = CharField(max_length=13)
    age = IntegerField(default=0)
    household_size = CharField(max_length=255, choices=settings.HOUSEHOLDSIZE,default='1名〜2名' )
    acreage = CharField(max_length=255, choices=settings.ACREAGE,default='20坪以下' )
    construction_position_type =CharField(max_length=255, choices=settings.CONSTRUCTIONPOSITIONTYPE,default='現住所と同じ' )
    construction_position = CharField(max_length=255 )
    construction_duration = CharField(max_length=255, choices=settings.CONSTRUCTIONDURATION,default='3ヵ月以内' )
    budger = CharField(max_length=255, choices=settings.BUDGET,default='1500万未満' )
    household_income = CharField(max_length=255, choices=settings.HOUSEHOLDINCOME,default='350万未満以下' )
    construction_type = CharField(max_length=255, choices=settings.CONSTRUCTION_TYPE,default='新規' )
    current_situation = CharField(max_length=255, choices=settings.CURRENTSITUATION,default='住宅・リフォーム・リノベの検討を始めた' )
    content = TextField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True)
    updated = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'outlet_store_contact'
        ordering = ['created', ]


class OutletStoreReview(Model):
    rating = IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    review = TextField()
    outlet_store = ForeignKey(OutletStore, related_name='outlet_store_review', on_delete=CASCADE)
    create_user = ForeignKey('users.User', related_name='create_user_outletstore_review', on_delete=CASCADE)
    update_user = ForeignKey('users.User', related_name='update_user_outletstore_review', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_review'
        ordering = ['created', ]

class OutletStoreBusiness(Model):
    outlet_store = ForeignKey(OutletStore, related_name='outlet_store_business', on_delete=CASCADE)
    business=IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    

    class Meta:
        db_table = 'outlet_store_business'
        ordering = ['created', ]