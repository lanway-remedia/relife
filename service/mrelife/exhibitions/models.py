import os
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group
from django.core.files.storage import default_storage as storage
from django.db.models import (
    CASCADE,
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


class Exhibition(Model):

    title = CharField(max_length=255)
    content = TextField()
    img_thumbnail = CharField(max_length=800, null=True)
    img_large = ImageField(null=True, blank=True)
    latitude = TextField(null=True)
    longtitude = TextField(null=True)
    address = CharField(max_length=800)
    district = ForeignKey(District, on_delete=CASCADE)
    zipcode = CharField(max_length=800, null=True)
    num_attend = IntegerField()
    start_time = DateTimeField(auto_now_add=False)
    end_time = DateTimeField(auto_now_add=False)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'exhibition'
        ordering = ['created', ]

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


class ExhibitionContact(Model):

    exhibition = ForeignKey(Exhibition, related_name='exhibition_contact', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'exhibition_contact'
        ordering = ['created', ]


class ExhibitionContactReply(Model):

    exhibition_contact = ForeignKey(Exhibition, related_name='exhibition_contact_reply', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'exhibition_contact_reply'
        ordering = ['created', ]
