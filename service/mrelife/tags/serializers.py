from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from mrelife.tags.models import Tag

class TagSerializer(serializers.ModelSerializer):
    # validate name is unique
    name = serializers.CharField(
        max_length=255,
        validators=[UniqueValidator(queryset=Tag.objects.all())]
    )

    class Meta:
        model = Tag
        fields = ('id', 'name',)