from django.urls import include, path

from mrelife.authenticates.views import (PasswordResetFromKey,
                                         PasswordResetRequest,
                                         RegisterView,
                                         RegisterConfirmView,
                                         RelifeJSONWebTokenAPIView,
                                         ReactiveView,
                                         NewMailConfirmView)
from rest_framework.urlpatterns import format_suffix_patterns

version_one = [
    path('login/', RelifeJSONWebTokenAPIView.as_view()),
    path('reset-request/', PasswordResetRequest.as_view()),
    path('reset-with-key/<str:uidb64>/<str:token_key>/', PasswordResetFromKey.as_view()),
    path('reactive/', ReactiveView.as_view()),
    path('register/', RegisterView.as_view()),
    path('register-confirm/<str:uidb64>/<str:token_key>/', RegisterConfirmView.as_view()),
    path('email-confirm/<str:uidb64>/<str:email>/<str:token_key>/', NewMailConfirmView.as_view()),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
