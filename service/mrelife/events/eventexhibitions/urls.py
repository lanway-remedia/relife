from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from mrelife.events.eventexhibitions import urls

from mrelife.events.eventexhibitions import views

router = routers.SimpleRouter()
router.register(r'', views.EventExhibitionViewSet)

urlpatterns = [
    path('', include(router.urls))

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
