from django.urls import include, path
from rest_framework.routers import SimpleRouter

from mrelife.users.views import CustomAuthToken, UserVs

router = SimpleRouter(trailing_slash=False)
router.register(r'users', UserVs)

version_one = [
    path(
        'api-token-auth/',
        CustomAuthToken.as_view(),
        name="api-token-auth"
    ),
]

urlpatterns = [
    path('v1/', include(version_one)),
    path('v1/', include(router.urls)),
]
