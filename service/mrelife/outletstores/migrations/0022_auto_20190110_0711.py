# Generated by Django 2.0.8 on 2019-01-10 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outletstores', '0021_auto_20190109_0725'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outletstore',
            name='latitude',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='outletstore',
            name='longitude',
            field=models.FloatField(null=True),
        ),
    ]