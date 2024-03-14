# Generated by Django 5.0.3 on 2024-03-13 17:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0003_alter_card_cardnumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='creationDate',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='card',
            name='expirationDate',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]