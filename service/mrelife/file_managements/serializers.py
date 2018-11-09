from rest_framework.serializers import Serializer, FileField


class FileSerializer(Serializer):
    file = FileField(required=True)
