# Generated by Django 5.0.3 on 2024-03-12 08:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_note_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='currentJob',
            field=models.CharField(default='Unemployed', max_length=50),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='currentLocation',
            field=models.CharField(default='Nowhere', max_length=120),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='shortDesc',
            field=models.CharField(default='Relatively hard-working and normal human being', max_length=100),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contacType', models.TextField(max_length=20)),
                ('contactContent', models.TextField(max_length=120)),
                ('contactOwner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skillContent', models.TextField(max_length=20)),
                ('skillOwner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
