from rest_framework.serializers import ModelSerializer

from mrelife.fees.models import Fee


class FeeSerializer(ModelSerializer):

    class Meta:
        model = Fee
        fields = '__all__'
