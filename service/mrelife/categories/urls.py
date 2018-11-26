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
category_export_csv = views.CategoryViewSet.as_view({
    'get' : 'export_csv'
})
urlpatterns = [
    path('<int:type>', category_create, name='create' ),
    path('<int:pk>/<int:type>', category_update, name='update'),
    path('export_csv', category_export_csv, name='category_export_csv'),
    #path('', include(router.urls)),
]

#urlpatterns = format_suffix_patterns(urlpatterns)
