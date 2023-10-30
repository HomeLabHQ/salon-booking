from rest_framework import serializers

from salon.models import Service, ServiceImage


class BaseServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "title", "price", "duration")


class ServiceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImage
        fields = ("id", "image")


class ServiceSerializer(BaseServiceSerializer):
    images = ServiceImageSerializer(many=True)

    class Meta(BaseServiceSerializer.Meta):
        fields = (
            *BaseServiceSerializer.Meta.fields,
            "images",
        )
