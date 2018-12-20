from django.urls import include, path, re_path
from rest_framework import routers

from mrelife.modelhouses import views

router = routers.SimpleRouter()
router.register(r'booking', views.OrderModelHouseViewSet)
router.register(r'', views.ModelHouseViewSet)


urlpatterns = [
    path("booking/<int:pk>/update_status/", views.updateStatus.as_view(), name="up_status_booking"),
    re_path(r'^reviews/', include('mrelife.modelhouses.modelhousereviews.urls')),
    path('', include(router.urls))

]
