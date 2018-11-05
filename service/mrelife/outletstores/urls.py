from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.outletstores import views

router = routers.SimpleRouter()
router.register(r'', views.OutletStoreViewSet)

urlpatterns = [
<<<<<<< HEAD
    #path('get/', csrf_exempt(views.OutletStoreList.as_view())),
    path('add/', csrf_exempt(views.OutletStoreCreate.as_view())),
    #path('update/<int:pk>/', csrf_exempt(views.OutletStoreUpdate.as_view())),
=======
>>>>>>> origin/dev
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
