from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.exhibitions import views
from mrelife.exhibitions.exhibitiontags.views import EhibitionTagViewSet


router = routers.SimpleRouter()
router.register(r'', views.EhibitionViewSet)

urlpatterns = [
    re_path(r'^tags/', include('mrelife.exhibitions.exhibitiontags.urls')),
    path('', include(router.urls))
    



]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
