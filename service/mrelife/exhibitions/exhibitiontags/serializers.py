from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from mrelife.exhibitions.models import Exhibition, ExhibitionTag
from mrelife.tags.models import Tag
from mrelife.tags.serializers import TagSerializer


class ExhibitionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition
        fields = '__all__'


class ExhibitionTagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exhibition_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    tag_id = serializers.IntegerField(write_only=True, required=False, allow_null=False)
    exhibition = ExhibitionItemSerializer(read_only=True)
    tag = TagSerializer(read_only=True)
    is_active = serializers.BooleanField(default=True,read_only=False)

    class Meta:
        model = ExhibitionTag
        fields = ('id',  'tag_id', 'exhibition_id', 'exhibition', 'tag', 'is_active')

    def validate_tag_id(self, tag_id):
        try:
            item = Tag.objects.get(id=tag_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return tag_id

    def validate_exhibition_id(self, exhibition_id):
        try:
            item = Exhibition.objects.get(id=exhibition_id)
            if(not item.is_active):
                raise
        except Exception as e:
            raise serializers.ValidationError(e)
        return exhibition_id
