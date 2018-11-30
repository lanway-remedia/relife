import os
from io import BytesIO

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
from mrelife.tags.models import Tag


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

    def save(self, *args, **kwargs):
        if not self.pk:
            super(Exhibition, self).save(*args, **kwargs)
            self.img_thumbnail = self.create_img_thumbnail()
            self.save()
        else:
            self.img_thumbnail = self.create_img_thumbnail()
            super(Exhibition, self).save(*args, **kwargs)

    def create_img_thumbnail(self):
        if not self.img_large:
            return None
        file_path = self.img_large.name
        filename_base, filename_ext = os.path.splitext(file_path)
        thumb_file_path = "%s_thumb.jpg" % filename_base
        if storage.exists(thumb_file_path):
            return settings.MEDIA_URL + thumb_file_path
        try:
            # resize the original image and return url path of the thumbnail
            f = storage.open(file_path, 'r')
            image = Image.open(f)
            width, height = image.size
            basewidth = 300

            wpercent = (basewidth / float(width))
            hsize = int((float(height) * float(wpercent)))
            image = image.resize((basewidth, hsize), Image.ANTIALIAS)

            f = storage.open(file_path, 'r')
            image = Image.open(f)
            width, height = image.size
            basewidth = 300

            wpercent = (basewidth / float(width))
            hsize = int((float(height) * float(wpercent)))
            image = image.resize((basewidth, hsize), Image.ANTIALIAS)

            f_thumb = storage.open(thumb_file_path, "w")
            out_im2 = BytesIO()
            image.save(out_im2, "JPEG")
            f_thumb.write(out_im2.getvalue())
            f_thumb.close()

            return settings.MEDIA_URL + thumb_file_path
        except:
            return None


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


class ExhibitionTag(Model):

    exhibition = ForeignKey(Exhibition, related_name="exhibition_tag", on_delete=CASCADE)
    tag = ForeignKey(Tag, related_name="tag_exhibition", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'exhibition_tag'
        ordering = ['created', ]
