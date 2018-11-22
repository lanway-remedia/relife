import os
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
    img_large = ImageField(null=True, blank=True)
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
        super(OutletStore, self).save(*args, **kwargs)
        self.create_img_thumbnail()

    def create_img_thumbnail(self):
        if not self.img_large:
            return ""
        file_path = self.img_large.name
        filename_base, filename_ext = os.path.splitext(file_path)
        thumb_file_path = settings.MEDIA_ROOT+"%s_thumb.jpg" % filename_base
        if storage.exists(thumb_file_path):
            return "exists"
        try:
            # resize the original image and return url path of the thumbnail
            f = storage.open(file_path, 'r')
            image = Image.open(f)
            width, height = image.size
            basewidth = 300

            wpercent = (basewidth / float(width))
            hsize = int((float(height) * float(wpercent)))
            image = image.resize((basewidth, hsize), Image.ANTIALIAS)

            f_thumb = storage.open(thumb_file_path, "w")
            image.save(f_thumb, "JPEG")
            f_thumb.close()
            self.img_thumbnail = settings.MEDIA_URL + thumb_file_path
            self.save()
            return "success"
        except:
            return "error"


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
