# Generated by Django 2.0.8 on 2018-12-06 08:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0005_auto_20181206_0816'),
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
