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


class Region(Model):
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'Region'
        ordering = ['order', ]

class City(Model):
    region = ForeignKey(Region, related_name='citys', on_delete=CASCADE,null=True, blank=True)
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'City'
        ordering = ['order', ]
        
    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)

