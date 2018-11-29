import os
from io import BytesIO

from django.core.files.storage import default_storage as storage
from django.db.models import (CASCADE, BooleanField, CharField, DateTimeField,
                              ForeignKey, ImageField, Model, SmallIntegerField,
                              TextField)
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from PIL import Image

from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag


class ModelHouse(Model):

    title = CharField(max_length=255, null=False)
    content = TextField(null=False)
    contruction_method = TextField(null=False)
    property_feature = TextField(null=True)
    manufacturer_name = CharField(max_length=255, null=True)
    structure = CharField(max_length=255, null=True)
    floor_map = CharField(max_length=255, null=True)
    img_thumbnail = CharField(max_length=800, null=True, blank=True)
    img_large = ImageField(null=True, blank=True)
    land_area = CharField(max_length=255, null=True)
    construction_area = CharField(max_length=255, null=True)
    create_user = ForeignKey('users.User', related_name= "creating_model_houses", on_delete=CASCADE, blank=True, null=True)
    is_active = BooleanField(default=True)
    is_free = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'model_house'
        ordering = ['created', ]

    # def save(self, *args, **kwargs):
    #     super(ModelHouse, self).save(*args, **kwargs)
    #     self.create_thumb()

    def create_thumb(self):
        if not self.img_large:
            return ""
        file_path = self.img_large.name
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

            f_thumb = storage.open(thumb_file_path, "wb")
            out_im2 = BytesIO()
            image.save(out_im2, "JPEG")
            f_thumb.write(out_im2.getvalue())
            f_thumb.close()
            self.img_thumbnail = thumb_file_path
            self.save()
            return "success"
        except:
            return "error"


class ModelHouseUser(Model):

    user = ForeignKey('users.User', related_name="own_model_house", on_delete=CASCADE)
    model_house = ForeignKey(ModelHouse, related_name="users", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'model_house_user'
        ordering = ['created', ]


class ModelHouseTag(Model):

    model_house = ForeignKey(ModelHouse, related_name="tags", on_delete=CASCADE)
    tag = ForeignKey(Tag, related_name="model_houses", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'model_house_tag'
        ordering = ['created', ]


class ModelHouseMedia(Model):

    modern_house = ForeignKey(ModelHouse, related_name="medias", on_delete=CASCADE)
    url = CharField(max_length=800)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_media'
        ordering = ['created', ]


class ModelHouseOutletStore(Model):

    model_house = ForeignKey(ModelHouse, related_name="stores", on_delete=CASCADE)
    outlet_store = ForeignKey('outletstores.OutletStore', related_name="model_houses", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'model_house_outlet_store'
        ordering = ['created', ]


class ModelHouseContact(Model):
    modern_house = ForeignKey(ModelHouse, related_name='contacts', on_delete=CASCADE)
    create_user = ForeignKey('users.User', related_name="model_house_contacts", on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_contact'
        ordering = ['created', ]


class ModelHouseContactReply(Model):
    modern_house_contact = ForeignKey(ModelHouseContact, related_name="replies", on_delete=CASCADE)
    user = ForeignKey('users.User', related_name="model_house_contact_replies", on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_contact_reply'
        ordering = ['created', ]


class OrderModelHouse(Model):
    
    create_user = ForeignKey('users.User', related_name="creating_order_model_house",
                             on_delete=CASCADE, blank=True, null=True)
    model_house = ForeignKey(ModelHouse, related_name="order_model_house", on_delete=CASCADE, blank=True, null=True)
    tel = CharField(max_length=13, null=False)
    content = TextField(null=False)
    status = BooleanField(null=False)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        db_table = 'order_model_house'
        ordering = ['created', ]
