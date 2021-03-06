import os
from io import BytesIO

from django.conf import settings
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

from mrelife.locations.models import District


class OutletStore(Model):
    title = CharField(max_length=255)
    content = TextField()
    img_thumbnail = CharField(max_length=800, null=True)
    img_large = ImageField(upload_to='outletimag/', null=True, blank=True)
    latitude = TextField(null=True)
    longitude = TextField(null=True)
    address = CharField(max_length=800)
    district = ForeignKey(District, related_name="outlet_dict", on_delete=CASCADE)
    tel = CharField(max_length=13)
    email = CharField(max_length=100)
    zipcode = CharField(max_length=8, null=True)
    home_page = CharField(max_length=255, null=True)
    traffic = CharField(max_length=255, null=True)
    time_serving = CharField(max_length=255, null=True)
    regular_holiday = CharField(max_length=255, null=True)
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


class OutletStoreMedia(Model):
    outlet_store = ForeignKey(OutletStore, related_name='outlet_store_media', on_delete=CASCADE)
    type_media = BooleanField()
    title = CharField(max_length=255)
    description = TextField(null=True)
    url = CharField(max_length=800)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_media'
        ordering = ['created', ]


class OutletStoreContact(Model):
    outlet_store = ForeignKey(OutletStore, related_name='outlet_store_contact', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_contact'
        ordering = ['created', ]


class OutletStoreContactReply(Model):
    outlet_store_contact = ForeignKey(OutletStoreContact, related_name='outlet_store_contact_relpy', on_delete=CASCADE)
    user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_contact_reply'
        ordering = ['created', ]
