import os
from io import BytesIO

from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group
from django.core.files.storage import default_storage as storage
from django.db.models import (SET_NULL, BooleanField, CharField, DateTimeField,
                              ForeignKey, ImageField, IntegerField, Model)
from PIL import Image

from mrelife.outletstores.models import OutletStore


class User(AbstractUser):
    birth_date = DateTimeField(auto_now_add=False, null=True, blank=True)
    address = CharField(max_length=800, null=True, blank=True)
    tel = CharField(max_length=13, null=True, blank=True)
    zipcode = CharField(max_length=8, null=True, blank=True)
    group = ForeignKey(Group, related_name='users', null=True, on_delete=SET_NULL)
    profile_image = ImageField(null=True, blank=True)
    profile_image_thumb = CharField(max_length=800, null=True, blank=True)

    store = ForeignKey(OutletStore, related_name='users', null=True, blank=True, on_delete=SET_NULL)

    class Meta:
        ordering = ['date_joined', ]

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        self.create_avatar_thumb()

    def create_avatar_thumb(self):
        if not self.profile_image:
            return ""
        file_path = self.profile_image.name
        filename_base, filename_ext = os.path.splitext(file_path)
        thumb_file_path = "%s_thumb.jpg" % filename_base
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
            out_im2 = BytesIO()
            image.save(out_im2, "JPEG")
            f_thumb.write(out_im2.getvalue())
            f_thumb.close()
            self.profile_image_thumb = settings.MEDIA_URL + thumb_file_path
            self.save()
            return "success"
        except:
            return "error"


class RepresentSubAcc(Model):
    represent_user_id = IntegerField()
    sub_user_id = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'represent_sub_acc'
        ordering = ['created', ]
