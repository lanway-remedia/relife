from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.events.eventcontacts import views

router = routers.SimpleRouter()
router.register(r'', views.EventContactViewSet)

urlpatterns = [
    path('', include(router.urls))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)