from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from mrelife.examplehouses import views

router = routers.SimpleRouter()
router.register(r'', views.ExampleHouseViewSet)

version_one = [
    path('', include(router.urls)),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
