from django.urls import path
from outletstore.views import OutletStoreViewsets #outletstore_list,outletstore_detail
from rest_framework import routers
router = routers.SimpleRouter()
router.register(r'outletstores', OutletStoreViewsets,base_name='outletstores')
urlpatterns = router.urls