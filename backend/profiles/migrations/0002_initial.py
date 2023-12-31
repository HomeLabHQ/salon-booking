# Generated by Django 4.2.5 on 2023-10-07 15:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("profiles", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("salon", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="masterprofile",
            name="services",
            field=models.ManyToManyField(blank=True, to="salon.service"),
        ),
        migrations.AddField(
            model_name="clientprofile",
            name="client",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, related_name="client_profile", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
