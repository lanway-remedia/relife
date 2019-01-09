from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.outletstores.ouletstorecontacts import views

router = routers.SimpleRouter()
router.register(r'', views.OutletStoreContactViewSet)

urlpatterns = [
    path('<int:pk>/update_status/', views.OutletStoreUpdatestatus.as_view(), name="update_status"),
    path('', include(router.urls)),
]
