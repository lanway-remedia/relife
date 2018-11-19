from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.outletstores import views

router = routers.SimpleRouter()
router.register(r'medias', views.OutletStoreMediaViewSet)
router.register(r'contacts_reply', views.OutletStoreContactReplyViewSet)
router.register(r'contacts', views.OutletStoreContactViewSet)
router.register(r'', views.OutletStoreViewSet)

urlpatterns = [
    # path('get/', csrf_exempt(views.OutletStoreList.as_view())),
    # path('add/', csrf_exempt(views.OutletStoreCreate.as_view())),
    # path('update/<int:pk>/', csrf_exempt(views.OutletStoreUpdate.as_view())),

    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
