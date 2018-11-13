from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.views import defaults as default_views
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

api_patterns = [
    path('outletstores/', include('mrelife.outletstores.urls')),
    path("users/", include("mrelife.users.urls")),
    path("file-managements/", include("mrelife.file_managements.urls"), name="FileManagements"),
    path("auths/", include("mrelife.authenticates.urls"), name="Authenticates"),
    path('tags/', include('mrelife.tags.urls')),
    path('categories/', include('mrelife.categories.urls')),
    path('modelhouses/', include('mrelife.modelhouses.urls')),
    path('events/', include('mrelife.events.urls')),
    path('exhibitions/', include('mrelife.exhibitions.urls')),

]

urlpatterns = [
                  path("", schema_view, name="home"),
                  path('api-auth/', include('rest_framework.urls')),
                  # Your stuff: custom urls includes go here
                  path('api/', include(api_patterns))
              ] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
