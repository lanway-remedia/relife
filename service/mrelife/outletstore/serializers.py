from rest_framework import serializers
from outletstore.models import OutletStore,Category


class OutletStoreSerializer(serializers.ModelSerializer):
    category_name=serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = OutletStore
        fields = ('id','title','content','category_name','thumbnail','latitude','longitude','address','tel','email','zipcode','area_of_premises','start_time','end_time')
class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"