# Generated by Django 2.0.8 on 2018-11-23 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelhouses', '0008_auto_20181123_0303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelhouseoutletstore',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='modelhouseoutletstore',
            name='updated',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
