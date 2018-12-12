from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from mrelife.fees.models import Fee
from mrelife.fees.serializers import FeeSerializer


class FeeViewSet(ModelViewSet):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = LimitOffsetPagination
