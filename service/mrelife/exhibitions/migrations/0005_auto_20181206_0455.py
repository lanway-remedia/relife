# Generated by Django 2.0.8 on 2018-12-06 04:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exhibitions', '0004_auto_20181205_0336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exhibitioncontactreply',
            name='exhibition_contact',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exhibition_contact_reply', to='exhibitions.ExhibitionContact'),
        ),
    ]
