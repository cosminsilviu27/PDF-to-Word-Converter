# Generated by Django 3.2 on 2023-12-02 14:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('pdf_to_word', '0002_auto_20231202_1310'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conversionrecord',
            name='word_file',
        ),
        migrations.AlterField(
            model_name='conversionrecord',
            name='status',
            field=models.CharField(default='default_status', max_length=255),
        ),
        migrations.AlterField(
            model_name='conversionrecord',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
