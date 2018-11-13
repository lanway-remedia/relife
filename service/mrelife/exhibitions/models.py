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

from mrelife.districts.models import District


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
