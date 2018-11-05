from django.urls import include, path

from mrelife.users.views import UserVs, custom_obtain_jwt_token
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

router = SimpleRouter()
router.register(r'', UserVs)

version_one = [
    path('login/', custom_obtain_jwt_token),
    path('users/', include(router.urls)),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
