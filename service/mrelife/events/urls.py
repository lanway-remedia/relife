from django.urls import path, include,re_path
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from mrelife.events import views

router = routers.SimpleRouter()
router.register(r'', views.EventViewSet)

urlpatterns = [
    re_path(r'^modelhouses/', include('mrelife.events.eventmodelhouses.urls')),
    re_path(r'^contacts/', include('mrelife.events.eventcontacts.urls')),
    re_path(r'^contact_replys/', include('mrelife.events.eventcontactreplys.urls')),
    re_path(r'^exhibitions/', include('mrelife.events.eventexhibitions.urls')),
    path('', include(router.urls))
]
urlpatterns = format_suffix_patterns(urlpatterns)