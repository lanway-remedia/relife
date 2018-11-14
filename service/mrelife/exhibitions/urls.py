from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

from mrelife.exhibitions import views

router = routers.SimpleRouter()
router.register(r'', views.EhibitionViewSet)

urlpatterns = [
    path('', include(router.urls))
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)