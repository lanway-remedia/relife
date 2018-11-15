from django.urls import include, path
from mrelife.categories import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()
router.register(r'', views.CategoryViewSet, 'type')

category_create = views.CategoryViewSet.as_view({
    'post': 'create',
    'get': 'list'
})
category_update = views.CategoryViewSet.as_view({
    'put': 'update',
    'delete': 'destroy'
})
urlpatterns = [
    path('<int:type>', category_create, name='create' ),
    path('<int:pk>/<int:type>', category_update, name='update'),
    #path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
