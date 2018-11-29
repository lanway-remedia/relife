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

    event = ForeignKey(Event, related_name="model_houses", on_delete=CASCADE)
    modelhouse = ForeignKey(ModelHouse, related_name="events", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_model_house'
        ordering = ['created', ]


class EventExhibition(Model):

    event = ForeignKey(Event,related_name="event_exhibition", on_delete=CASCADE)
    exhibition = ForeignKey(Exhibition,related_name="exhibition_event", on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_exhibition'
        ordering = ['created', ]


class EventContact(Model):

    event = ForeignKey(Event,related_name="event_contact", on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_contact'
        ordering = ['created', ]


class EventContactReply(Model):

    event_contact = ForeignKey(EventContact, related_name='event_contact_reply', on_delete=CASCADE)
    create_user = ForeignKey('users.User', on_delete=CASCADE)
    comment = CharField(max_length=255)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'event_contact_reply'
        ordering = ['created', ]
