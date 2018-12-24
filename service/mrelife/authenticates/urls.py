"""
    Authenticate Router
"""
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from mrelife.authenticates.views import (NewMailConfirmView,
                                         PasswordResetFromKey,
                                         PasswordResetRequest, ReactiveView,
                                         RegisterConfirmView, RegisterView,
                                         RelifeJSONWebTokenAPIView)
from mrelife.authenticates.views_v2 import JWTLoginView, RegisterV2View

version_one = [
    path('login/', RelifeJSONWebTokenAPIView.as_view()),
    path('reset-request/', PasswordResetRequest.as_view()),
    path('reset-with-key/<str:uidb64>/<str:token_key>/', PasswordResetFromKey.as_view()),
    path('reactive/', ReactiveView.as_view()),
    path('register/', RegisterView.as_view()),
    path('register-confirm/<str:uidb64>/<str:token_key>/', RegisterConfirmView.as_view()),
    path('email-confirm/<str:uidb64>/<str:email>/<str:token_key>/', NewMailConfirmView.as_view()),
]

version_two = [
    path('login/', JWTLoginView.as_view()),
    path('register/', RegisterV2View.as_view()),
]

urlpatterns = [
    path('v1/', include(version_one)),
    path('v2/', include(version_two)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
