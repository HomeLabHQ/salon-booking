from rest_framework.routers import SimpleRouter

from salon.views import ServiceViewSet

app_name = "salon"
router = SimpleRouter()
router.register("items", ServiceViewSet, basename="services")

urlpatterns = [*router.urls]
