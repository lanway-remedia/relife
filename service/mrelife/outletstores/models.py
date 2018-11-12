from django.db.models import (
    CASCADE,
    BooleanField,
    CharField,
    DateTimeField,
    ForeignKey,
    ImageField,
    Model,
    TextField,
    IntegerField
)


class Category(Model):
    name = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'category'
        ordering = ['created', ]

class SubCategory(Model):
    category = ForeignKey(Category, on_delete=CASCADE)
    name = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'sub_category'
        ordering = ['created', ]


class Tag(Model):
    name = CharField(unique=True, max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'tag'
        ordering = ['created', ]


class OutletStore(Model):
    title = CharField(max_length=255)
    content = TextField()
    category = ForeignKey(Category, on_delete=CASCADE)
    thumbnail = ImageField(upload_to='Images/outletstore/', default='')
    latitude = TextField()
    longitude = TextField()
    address = CharField(max_length=800)
    tel = CharField(max_length=13)
    email = CharField(max_length=100)
    zipcode = CharField(max_length=8)
    area_of_premises = CharField(max_length=50)
    start_time = DateTimeField(auto_now_add=False)
    end_time = DateTimeField(auto_now_add=False)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'outlet_store'
        ordering = ['created', ]


class OutletStoreTag(Model):
    outlet_store = ForeignKey(OutletStore, on_delete=CASCADE)
    tag = ForeignKey(Tag, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_tag'
        ordering = ['created', ]


class OutletStoreMedia(Model):
    outlet_store = ForeignKey(OutletStore, on_delete=CASCADE)
    type_media = BooleanField()
    title = CharField(max_length=255)
    description = TextField()
    url = CharField(max_length=800)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_media'
        ordering = ['created', ]


class OutletStoreComment(Model):
    outlet_store = ForeignKey(OutletStore, on_delete=CASCADE)
    user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_comment'
        ordering = ['created', ]


class OutletStoreCommentReply(Model):
    os_comment = ForeignKey(OutletStoreComment, on_delete=CASCADE)
    user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'outlet_store_comment_reply'
        ordering = ['created', ]
