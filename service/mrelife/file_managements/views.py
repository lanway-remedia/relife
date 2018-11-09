from django.core.files.storage import default_storage

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.parsers import (FileUploadParser, FormParser,
                                    MultiPartParser)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from mrelife.file_managements.serializers import FileSerializer


class MyUploadView(APIView):
    parser_class = (FormParser, MultiPartParser)
    serializer_class = FileSerializer
    # permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if not file_serializer.is_valid():
            return Response({
                'status': False,
                'messageCode': 'FM002',
                'messageParams': {},
                'data': file_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        f = request.data['file']
        file = default_storage.save(f.name, f)

        return Response({
            'status': True,
            'messageCode': 'FM001',
            'messageParams': {},
            'data': {"url": default_storage.path(file)}
        }, status=status.HTTP_201_CREATED)
