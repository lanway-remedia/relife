# Generated by Django 2.0.8 on 2018-12-05 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outletstores', '0005_auto_20181128_0612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outletstore',
            name='img_large',
            field=models.ImageField(blank=True, null=True, upload_to='outletimag/'),
        ),
    ]