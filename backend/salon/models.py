from django.db import models
from salon_booking.models import TitleModel


class Branch(TitleModel):
    location = models.CharField(max_length=255)

    class Meta:
        db_table = "branch"
        verbose_name_plural = "branches"
        ordering = ("-id",)


class Service(TitleModel):
    price = models.PositiveIntegerField()
    duration = models.DurationField()

    class Meta:
        db_table = "services"
        verbose_name_plural = "services"
        ordering = ("-id",)


class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="services")

    class Meta:
        db_table = "service_image"
        verbose_name_plural = "service images"
        ordering = ("-id",)


class ServiceRequest(models.Model):
    start_time = models.DateTimeField()
    client = models.ForeignKey("profiles.ClientProfile", on_delete=models.CASCADE, related_name="requests")
    master = models.ForeignKey("profiles.MasterProfile", on_delete=models.CASCADE, related_name="requests")
    services = models.ManyToManyField("salon.Service", blank=True)

    class Meta:
        db_table = "service_requests"
        verbose_name_plural = "service requests"
        ordering = ("-id",)

    @property
    def total_duration(self) -> int:
        if services := self.services:
            return sum(service.duration for service in services)
        return 0

    @property
    def total_price(self) -> int:
        if services := self.services:
            return sum(service.price for service in services)
        return 0
