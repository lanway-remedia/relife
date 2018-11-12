from mrelife.outletstores.models import SubCategory, Category
from rest_framework import serializers
from rest_framework.validators import UniqueValidator




class CategorySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=Category.objects.all())]
    )

    class Meta:
        model = Category
        fields = ('id', 'name', 'order')
class SubCategorySerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=SubCategory.objects.all())]
    )


    class Meta:
        model = SubCategory
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
       

