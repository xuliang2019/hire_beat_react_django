# Generated by Django 3.0.5 on 2020-05-07 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_auto_20200507_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='title',
            field=models.CharField(default='BQ', max_length=300),
        ),
    ]
