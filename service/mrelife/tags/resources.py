from import_export import resources
from mrelife.tags.models import Tag

class TagResource(resources.ModelResource):
    class Meta:
        model = Tag
        fields = ('id', 'name', )