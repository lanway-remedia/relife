from django.urls import include, path
from mrelife.tags import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()
router.register(r'', views.TagViewSet)

urlpatterns = [
    # path('get/', csrf_exempt(views.OutletStoreList.as_view())),
    # path('add/', csrf_exempt(views.OutletStoreCreate.as_view())),
    # path('update/<int:pk>/', csrf_exempt(views.OutletStoreUpdate.as_view())),

    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
