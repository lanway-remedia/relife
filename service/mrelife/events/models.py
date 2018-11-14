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

from mrelife.exhibitions.models import Exhibition
from mrelife.modelhouses.models import ModelHouse


class Event(Model):

    title = CharField(max_length=255)
    content = TextField()
    url = CharField(max_length=800, null=True)
    start_time = DateTimeField(auto_now_add=False)
    end_time = DateTimeField(auto_now_add=False)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False)
    updated = DateTimeField(auto_now_add=False)

    class Meta:
        db_table = 'event'
        ordering = ['created', ]


class EventModelHouse(Model):

    name = CharField(max_length=255)
    Event = ForeignKey(Event, on_delete=CASCADE)
    modelhouse = ForeignKey(ModelHouse, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_model_house'
        ordering = ['created', ]


class EventExhibition(Model):

    event = ForeignKey(Event, on_delete=CASCADE)
    exhibition = ForeignKey(Exhibition, on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_exhibition'
        ordering = ['created', ]


class EventContact(Model):

    event = ForeignKey(Event, on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_contact'
        ordering = ['created', ]


class EventContactReply(Model):

    event_contact = ForeignKey(EventContact, related_name='outlet_store_tag', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_contact_reply'
        ordering = ['created', ]
