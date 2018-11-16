# Generated by Django 2.0.8 on 2018-11-15 03:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('modelhouses', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modelhousemedia',
            name='description',
        ),
        migrations.RemoveField(
            model_name='modelhousemedia',
            name='title',
        ),
        migrations.AddField(
            model_name='modelhouse',
            name='is_free',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='modelhouse',
            name='create_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creating_model_houses', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='modelhousecontact',
            name='create_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model_house_contacts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='modelhousecontact',
            name='modern_house',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contacts', to='modelhouses.ModelHouse'),
        ),
        migrations.AlterField(
            model_name='modelhousecontactreply',
            name='modern_house_contact',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='modelhouses.ModelHouseContact'),
        ),
        migrations.AlterField(
            model_name='modelhousecontactreply',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model_house_contact_replies', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='modelhousemedia',
            name='img_type',
            field=models.SmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='modelhousemedia',
            name='modern_house',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medias', to='modelhouses.ModelHouse'),
        ),
        migrations.AlterField(
            model_name='modelhousemedia',
            name='type_media',
            field=models.SmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='modelhouseoutletstore',
            name='model_house',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stores', to='modelhouses.ModelHouse'),
        ),
        migrations.AlterField(
            model_name='modelhouseoutletstore',
            name='outlet_store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model_houses', to='outletstores.OutletStore'),
        ),
        migrations.AlterField(
            model_name='modelhousetag',
            name='model_house',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='modelhouses.ModelHouse'),
        ),
        migrations.AlterField(
            model_name='modelhousetag',
            name='tag',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model_houses', to='tags.Tag'),
        ),
        migrations.AlterField(
            model_name='modelhouseuser',
            name='model_house',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='modelhouses.ModelHouse'),
        ),
        migrations.AlterField(
            model_name='modelhouseuser',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='own_model_house', to=settings.AUTH_USER_MODEL),
        ),
    ]
