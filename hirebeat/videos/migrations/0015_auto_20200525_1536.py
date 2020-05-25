# Generated by Django 3.0.5 on 2020-05-25 15:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('videos', '0014_auto_20200524_1801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='reviewer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewed_videos', to=settings.AUTH_USER_MODEL),
        ),
    ]