# Generated by Django 2.0.8 on 2018-12-24 08:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('outletstores', '0007_outletstorereview'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outletstore',
            name='district',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='outlet_dict', to='locations.District'),
        ),
    ]
