# Generated by Django 2.0.8 on 2018-12-28 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exhibitions', '0005_auto_20181206_0455'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exhibition',
            name='zipcode',
            field=models.CharField(max_length=8, null=True),
        ),
    ]
