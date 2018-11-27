# Create your models here.
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


class Tag(Model):
    name = CharField(unique=True, max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=True, blank=True)
    updated = DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        db_table = 'tag'
        ordering = ['created', ]
