from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from outletstores import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

router = routers.SimpleRouter()
router.register(r'', views.OutletStoreViewSet)

urlpatterns = [
    #path('get/', csrf_exempt(views.OutletStoreList.as_view())),
    path('add/', csrf_exempt(views.OutletStoreCreate.as_view())),
    #path('update/<int:pk>/', csrf_exempt(views.OutletStoreUpdate.as_view())),
    path('', include(router.urls)),
    #path('delete/<int:pk>/', csrf_exempt(views.OutletStoreDelete.as_view())),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)