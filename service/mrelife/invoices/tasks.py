import calendar
from datetime import datetime

from celery.schedules import crontab
from mrelife.fees.models import Fee
from mrelife.invoices.models import Invoice
from mrelife.outletstores.models import OutletStore
from mrelife.taskapp.celery import app


@app.task(bind=True)
def create_invoice():
    stores = OutletStore.objects.all()
    fee = Fee.objects.last()
    for store in stores:
        Invoice.objects.create(
            outlet_store=store,
            fee=fee,
            has_participation_fee=0,
            booking_number=0,
            model_house_number=0,
            example_house_number=0,
            article_number=0,
            total_fee=0
        )


@app.task(bind=True)
def update_invoice():
    current_month = datetime.now().month
    invoices = Invoice.objects.filter(created__month=current_month)
    for invoice in invoices:
        last_update = invoice.updated
        store = invoice.outlet_store
        fee = invoice.fee
        
        ex_house = store.example_houses.filter(created__gt=last_update).count()
        ex_house_price = ex_house * fee.per_example_house_fee
        invoice.example_house_number += ex_house
        invoice.total_fee += ex_house_price

        m_house = store.model_houses.filter(created__gt=last_update).count()
        m_house_price = m_house * fee.per_model_house_fee
        invoice.model_house_number += m_house
        invoice.total_fee += m_house_price

        invoice.save()
        










app.conf.beat_schedule = {
    'add-every-firt-day-of-month': {
        'task': 'mrelife.fees.tasks.create_invoice',
        'schedule': crontab(0, 0, day_of_month='1'),
    },
    'update-every-day': {
        'task': 'mrelife.fees.tasks.update_invoce',
        'schedule': crontab(hour=0, minute=15, day_of_week='0-6'),
    },
}
