from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.outletstores import views
from mrelife.outletstores import views
from mrelife.outletstores.ouletstorecontacts import urls

router = routers.SimpleRouter()
# router.register(r'medias', views.OutletStoreMediaViewSet)
# router.register(r'contacts_reply', views.OutletStoreContactReplyViewSet)
router.register(r'', views.OutletStoreViewSet)

urlpatterns = [
    re_path(r'^contact/', include('mrelife.outletstores.ouletstorecontacts.urls')),
    re_path(r'^contacts_reply/', include('mrelife.outletstores.outletstorecontactreplys.urls')),
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
