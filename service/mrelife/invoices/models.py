from django.db.models import CASCADE, DateField, FloatField, IntegerField, ForeignKey, BooleanField

from mrelife.fees.models import Fee
from mrelife.outletstores.models import OutletStore
from mrelife.utils.base_models import BaseModel


class Invoice(BaseModel):
    outlet_store = ForeignKey(OutletStore, related_name="invoices", on_delete=CASCADE)
    fee = ForeignKey(Fee, related_name="invoices", on_delete=CASCADE)
    has_participation_fee = FloatField(default=0)
    booking_number = FloatField(default=0)
    model_house_number = FloatField(default=0)
    example_house_number = FloatField(default=0)
    article_number = FloatField(default=0)
    total_fee = FloatField(default=0)
    paid = BooleanField(default=False)

    class Meta:
        db_table = 'invoice'
        ordering = ['created', ]
    
