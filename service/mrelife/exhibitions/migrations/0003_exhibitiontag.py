# Generated by Django 2.0.8 on 2018-11-27 03:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('exhibitions', '0002_exhibitioncontact_exhibitioncontactreply'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExhibitionTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated', models.DateTimeField(auto_now=True, null=True)),
                ('exhibition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exhibition_tag', to='exhibitions.Exhibition')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tag_exhibition', to='tags.Tag')),
            ],
            options={
                'db_table': 'exhibition_tag',
                'ordering': ['created'],
            },
        ),
    ]
