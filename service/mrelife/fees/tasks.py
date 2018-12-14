import calendar
from datetime import datetime

from celery.schedules import crontab

from mrelife.fees.models import Fee
from mrelife.taskapp.celery import app


@app.task(bind=True)
def add_fee():
    today = datetime.today()
    year = str(today.year)
    month = str(today.month)
    last_day = str(calendar.monthrange(today.year, today.month)[1])
    last_obj = Fee.objects.last()
    last_obj.pk = None
    last_obj.start_date = year + '-' + month + '-1'
    last_obj.end_date = year + '-' + month + '-' + last_day
    last_obj.save()


app.conf.beat_schedule = {
    'add-every-firt-day-of-month': {
        'task': 'mrelife.fees.tasks.add_fee',
        'schedule': crontab(0, 0, day_of_month='1'),
    },
}
