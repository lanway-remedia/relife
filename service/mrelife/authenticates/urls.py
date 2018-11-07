from django.urls import path, include

from mrelife.authenticates.views import PasswordResetRequest, PasswordResetFromKey
from rest_framework.urlpatterns import format_suffix_patterns

version_one = [
    path('reset-request/', PasswordResetRequest.as_view()),
    path('reset-with-key/<str:uidb64>/<str:token_key>/', PasswordResetFromKey.as_view()),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
