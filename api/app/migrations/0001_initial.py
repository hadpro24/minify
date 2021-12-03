# Generated by Django 3.2.9 on 2021-11-04 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Film',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('released', models.DateField()),
                ('description', models.TextField()),
                ('runtime', models.DurationField()),
                ('country', models.CharField(max_length=150)),
                ('rated', models.DecimalField(decimal_places=2, max_digits=4)),
                ('image', models.ImageField(upload_to='films')),
            ],
        ),
    ]
