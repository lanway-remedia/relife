# Generated by Django 2.0.8 on 2019-01-02 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outletstores', '0012_auto_20190102_0840'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outletstorecontact',
            name='address',
            field=models.CharField(max_length=800),
        ),
        migrations.AlterField(
            model_name='outletstorecontact',
            name='construction_position',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='outletstorecontact',
            name='content',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='outletstorecontact',
            name='email',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='outletstorecontact',
            name='tel',
            field=models.CharField(max_length=13),
        ),
        migrations.AlterField(
            model_name='outletstorecontact',
            name='zipcode',
            field=models.CharField(max_length=8),
        ),
    ]