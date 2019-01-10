from django.urls import include, path
from mrelife.attributes import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()
router.register(r'contruction', views.ContructionViewSet)
router.register(r'price_range', views.PriceRangeViewSet)
router.register(r'floor', views.FloorViewSet)
router.register(r'commitment', views.CommitmentViewSet)
router.register(r'search_history', views.SearchHistoryViewSet)
router.register(r'style', views.StyleViewSet)
router.register(r'household_size', views.HouseHoldSizeViewSet)
router.register(r'household_income', views.HouseHoldIncomeViewSet)

contruction_export_csv = views.ContructionViewSet.as_view({
    'get': 'export_csv'
})
pricerange_export_csv = views.PriceRangeViewSet.as_view({
    'get': 'export_csv'
})
floor_export_csv = views.FloorViewSet.as_view({
    'get': 'export_csv'
})
style_export_csv = views.StyleViewSet.as_view({
    'get': 'export_csv'
})
commitment_export_csv = views.CommitmentViewSet.as_view({
    'get': 'export_csv'
})
household_size_export_csv = views.HouseHoldSizeViewSet.as_view({
    'get': 'export_csv'
})
household_income_export_csv = views.HouseHoldIncomeViewSet.as_view({
    'get': 'export_csv'
})
urlpatterns = [
    path('contruction/export_csv', contruction_export_csv, name="contruction_export_csv"),
    path('price_range/export_csv', pricerange_export_csv, name="household_income_export_csv"),
    path('floor/export_csv', floor_export_csv, name="floor_export_csv"),
    path('style/export_csv', style_export_csv, name="style_export_csv"),
    path('commitment/export_csv', commitment_export_csv, name="commitment_export_csv"),
    path('household_size/export_csv', household_size_export_csv, name="household_size_export_csv"),
    path('household_income/export_csv', household_income_export_csv, name="household_income_export_csv"),
    path('', include(router.urls)),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
