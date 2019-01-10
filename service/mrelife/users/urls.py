from django.urls import include, path

from mrelife.users.views import UserVs, ProfileVs
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns
from mrelife.users import views

router = SimpleRouter()
router.register(r'users', UserVs)
router.register(r'profile', ProfileVs)

version_one = [
    path("profile/become_owner/", views.BecomeOwner.as_view(), name="become_owner"),
    path('', include(router.urls)),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
