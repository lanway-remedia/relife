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


class City(Model):
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'city'
        #ordering = ['order', ]

class District(Model):
    city = ForeignKey(City, related_name='districts', on_delete=CASCADE)
    name = CharField(max_length=255)
    name_en = CharField(max_length=255)
    order = IntegerField(default=1)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'district'
        #ordering = ['order', ]
        
    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)

