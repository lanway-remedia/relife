from django.db.models import (
    CASCADE,
    BooleanField,
    CharField,
    IntegerField,
    Model,
    DateTimeField,
    ForeignKey
)
# Create your models here.


class Contruction(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'contruction'
        ordering = ['created', ]

class PriceRange(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'price_range'
        ordering = ['created', ]
class Floor(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'floor'
        ordering = ['created', ]

class Style(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'style'
        ordering = ['created', ]

class Style(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'style'
        ordering = ['created', ]
class Commitment(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'commitment'
        ordering = ['created', ]
class HouseHoldSize(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'household_size'
        ordering = ['created', ]

class HouseHoldIncome(Model):
    title = CharField(unique=True, max_length=255)
    order = IntegerField()
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'household_income'
        ordering = ['created', ]
class SearchHistory(Model):
    key_search = CharField(unique=True,max_length=255)
    num_result = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)
    class Meta:
        db_table = 'search_history'
        ordering = ['created', ]