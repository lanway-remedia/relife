from django.urls import include, path
from mrelife.locations import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()
router.register(r'', views.LocationViewSet)

location_create = views.LocationViewSet.as_view({
    'post': 'create',
    'get': 'list'
})
location_update = views.LocationViewSet.as_view({
    'put': 'update',
    'delete': 'destroy'
})
urlpatterns = [
    path('<int:type>', location_create, name='create'),
    path('<int:pk>/<int:type>', location_update, name='update')
    #path('', include(router.urls)),
]

#urlpatterns = format_suffix_patterns(urlpatterns)
