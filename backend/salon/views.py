from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, viewsets

from salon.models import Service
from salon.serializers import BaseServiceSerializer, ServiceSerializer
from salon_booking.mixins import ListSerializerMixin


@extend_schema(tags=["services"])
class ServiceViewSet(
    ListSerializerMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = ServiceSerializer
    list_serializer_class = BaseServiceSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = Service.objects.all()
