# Generated by Django 2.0.8 on 2018-12-05 03:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='city',
            options={'ordering': ['order']},
        ),
        migrations.AlterModelOptions(
            name='district',
            options={'ordering': ['order']},
        ),
    ]