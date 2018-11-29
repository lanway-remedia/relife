from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.modelhouses import views

router = routers.SimpleRouter()
router.register(r'booking', views.OrderModelHouseViewSet)
router.register(r'', views.ModelHouseViewSet)


urlpatterns = [
    path("booking/<int:pk>/update_status/", views.updateStatus.as_view(), name="booking_status"),
    path('', include(router.urls))

]

urlpatterns = format_suffix_patterns(urlpatterns)
