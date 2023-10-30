from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class MasterProfile(models.Model):
    master = models.OneToOneField("authentication.User", on_delete=models.CASCADE, related_name="master_profile")
    phone_number = PhoneNumberField(blank=True)
    services = models.ManyToManyField("salon.Service", blank=True)

    class Meta:
        db_table = "master_profiles"
        verbose_name_plural = "master profiles"
        ordering = ("-id",)


class ClientProfile(models.Model):
    client = models.OneToOneField("authentication.User", on_delete=models.CASCADE, related_name="client_profile")

    class Meta:
        db_table = "client_profiles"
        verbose_name_plural = "client profiles"
        ordering = ("-id",)
