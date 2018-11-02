from django.urls import path, include

from mrelife.file_managements import views
from rest_framework.urlpatterns import format_suffix_patterns

version_one = [
    path('upload/', views.MyUploadView.as_view()),
]

urlpatterns = [
    path('v1/', include(version_one)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
