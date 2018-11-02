from django.urls import include, path
from rest_framework.routers import SimpleRouter
from .views import custom_obtain_jwt_token

from mrelife.users import views

router = SimpleRouter(trailing_slash=False)
router.register(r'users', views.UserVs)

version_one = [
    path('login/', custom_obtain_jwt_token),
    path('test/', views.example_view),
]

urlpatterns = [
    path('v1/', include(version_one)),
    path('v1/', include(router.urls)),
]