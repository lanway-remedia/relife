# Generated by Django 2.0.8 on 2019-01-10 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attributes', '0002_searchhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchhistory',
            name='key_search',
            field=models.CharField(max_length=255),
        ),
    ]