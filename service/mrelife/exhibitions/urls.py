from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.exhibitions import views
from mrelife.exhibitions.exhibitiontags.views import ExhibitionTagViewSet


router = routers.SimpleRouter()
router.register(r'', views.EhibitionViewSet)

urlpatterns = [
    re_path(r'^tags/', include('mrelife.exhibitions.exhibitiontags.urls')),
    re_path(r'^contacts/', include('mrelife.exhibitions.exhibitioncontacts.urls')),
    re_path(r'^contact_replys/', include('mrelife.exhibitions.exhibitioncontactreplys.urls')),
    path('', include(router.urls))
    



]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
