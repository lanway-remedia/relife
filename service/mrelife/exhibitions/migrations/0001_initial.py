# Generated by Django 2.0.8 on 2018-11-13 12:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('districts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exhibition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('img_thumbnail', models.CharField(max_length=800, null=True)),
                ('img_large', models.ImageField(blank=True, null=True, upload_to='')),
                ('latitude', models.TextField(null=True)),
                ('longtitude', models.TextField(null=True)),
                ('address', models.CharField(max_length=800)),
                ('zipcode', models.CharField(max_length=800, null=True)),
                ('num_attend', models.IntegerField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
                ('create_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='districts.District')),
            ],
            options={
                'db_table': 'exhibition',
                'ordering': ['created'],
            },
        ),
    ]
