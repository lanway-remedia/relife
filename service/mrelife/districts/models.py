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


class City(Model):
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(null=True)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'city'


class District(Model):
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(null=True)
    City = ForeignKey(City, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'district'
