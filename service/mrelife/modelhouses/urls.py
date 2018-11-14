from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from mrelife.modelhouses import views

router = routers.SimpleRouter()
router.register(r'', views.ModelHouseViewSet)

urlpatterns = [
    path('', include(router.urls))
]

urlpatterns = format_suffix_patterns(urlpatterns)
