from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from modernhouses import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings


router = routers.SimpleRouter()
router.register(r'', views.ModernHouseViewSet)

urlpatterns = [
    path('', include(router.urls))
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)