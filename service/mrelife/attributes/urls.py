from django.urls import include, path
from mrelife.attributes import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()
router.register(r'contructions', views.ContructionViewSet)
router.register(r'price_range', views.PriceRangeViewSet)
router.register(r'floor', views.FloorViewSet)
router.register(r'style', views.StyleViewSet)
router.register(r'household_size', views.HouseHoldSizeViewSet)
router.register(r'household_income', views.HouseHoldIncomeViewSet)

urlpatterns = [
    # path('get/', csrf_exempt(views.OutletStoreList.as_view())),
    # path('add/', csrf_exempt(views.OutletStoreCreate.as_view())),
    # path('update/<int:pk>/', csrf_exempt(views.OutletStoreUpdate.as_view())),

    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)

