# Generated by Django 3.0.7 on 2020-06-24 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_profile_saved_video_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profession',
            field=models.CharField(default='Not provided', max_length=50),
        ),
    ]
