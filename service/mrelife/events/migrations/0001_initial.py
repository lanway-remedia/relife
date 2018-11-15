# Generated by Django 2.0.8 on 2018-11-14 06:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exhibitions', '0001_initial'),
        ('modelhouses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('url', models.CharField(max_length=800, null=True)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
                ('create_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'event',
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='EventContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(blank=True)),
                ('updated', models.DateTimeField(blank=True)),
                ('create_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Event')),
            ],
            options={
                'db_table': 'event_contact',
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='EventContactReply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(blank=True)),
                ('updated', models.DateTimeField(blank=True)),
                ('create_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('event_contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outlet_store_tag', to='events.EventContact')),
            ],
            options={
                'db_table': 'event_contact_reply',
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='EventExhibition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(blank=True)),
                ('updated', models.DateTimeField(blank=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Event')),
                ('exhibition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exhibitions.Exhibition')),
            ],
            options={
                'db_table': 'event_exhibition',
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='EventModelHouse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(blank=True)),
                ('updated', models.DateTimeField(blank=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Event')),
                ('modelhouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modelhouses.ModelHouse')),
            ],
            options={
                'db_table': 'event_model_house',
                'ordering': ['created'],
            },
        ),
    ]