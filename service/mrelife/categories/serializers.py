from mrelife.categories.models import SubCategory, Category
from rest_framework import serializers
from rest_framework.validators import UniqueValidator




class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super(FilteredListSerializer, self).to_representation(data)

class SubCategorySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=SubCategory.objects.all())]
    )
    

    class Meta:
        model = SubCategory
        list_serializer_class = FilteredListSerializer  # filter subcat with is_active= True in list category
        fields = ('id', 'name', 'order', 'category' )
    def create(self, validated_data):
        subCategory = SubCategory.objects.create(
            name=self.initial_data['name'],
            category = Category.objects.get(pk=self.initial_data['category']),
            is_active=True,
            created=validated_data['created'],
            updated=validated_data['updated']
        )
        return subCategory


class CategorySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Category.objects.all())]
    )
    sub_categories = SubCategorySerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'name', 'order', 'sub_categories')
       


