from django.db.models import DateField, FloatField

from mrelife.utils.base_models import BaseModel


class Fee(BaseModel):
    participation_fee = FloatField(default=0)
    per_booking_fee = FloatField(default=0)
    per_model_house_fee = FloatField(default=0)
    per_example_house_fee = FloatField(default=0)
    per_article_fee = FloatField(default=0)
    start_date = DateField()
    end_date = DateField()

    class Meta:
        db_table = 'fee'
        ordering = ['created', ]
