from django.db.models import CASCADE, BooleanField, CharField, DateTimeField, ForeignKey, ImageField, Model, TextField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

#from mrelife.tags.models import Tag
from mrelife.outletstores.models import OutletStore, Tag


class ModelHouse(Model):

    title = CharField(max_length=255, null=False)
    content = TextField(null=False)
    contruction_method = TextField(null=False)
    property_feature = TextField(null=True)
    manufacturer_name = CharField(max_length=255, null=True)
    structure = CharField(max_length=255, null=True)
    floor_map = CharField(max_length=255, null=True)
    img_thumbnail = CharField(max_length=800, null=True)
    img_large = CharField(max_length=800, null=True)
    land_area = CharField(max_length=255, null=True)
    construction_area = CharField(max_length=255, null=True)
    outlet_store = ForeignKey(OutletStore, on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'model_house'
        ordering = ['created', ]


class ModelHouseUser(Model):

    user = ForeignKey('users.User', on_delete=CASCADE)
    model_house = ForeignKey(ModelHouse, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'model_house_user'
        ordering = ['created', ]


class ModelHouseTag(Model):

    model_house = ForeignKey(ModelHouse, on_delete=CASCADE)
    tag = ForeignKey(Tag, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_tag'
        ordering = ['created', ]


class ModelHouseMedia(Model):

    modern_house = ForeignKey(ModelHouse, on_delete=CASCADE)
    type_media = BooleanField()
    img_type = BooleanField()
    title = CharField(max_length=255)
    description = TextField(null=True)
    url = CharField(max_length=800)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_media'
        ordering = ['created', ]


class ModelHouseOutletStore(Model):

    model_house = ForeignKey(ModelHouse, on_delete=CASCADE)
    outlet_store = ForeignKey('outletstores.OutletStore', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'model_house_outlet_store'
        ordering = ['created', ]


class ModelHouseContact(Model):
    modern_house = ForeignKey(ModelHouse, related_name='model_house_contact', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_contact'
        ordering = ['created', ]


class ModelHouseContactReply(Model):
    modern_house_contact = ForeignKey(ModelHouseContact, on_delete=CASCADE)
    user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'model_house_contact_reply'
        ordering = ['created', ]
