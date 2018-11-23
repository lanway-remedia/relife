from import_export import resources
from mrelife.categories.models import Category, SubCategory

class SubCategoryResource(resources.ModelResource):
    class Meta:
        model = SubCategory
        fields = ('id', 'name', )