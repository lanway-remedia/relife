from django.core.files.storage import default_storage

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class MyUploadView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        if 'file' not in request.data:
            return Response({
                'status': False,
                'messageCode': 'FM002',
                'messageParams': {},
                'data': {}
            }, status=status.HTTP_400_BAD_REQUEST)

        f = request.data['file']
        file = default_storage.save(f)

        return Response({
            'status': True,
            'messageCode': 'FM001',
            'messageParams': {},
            'data': {"url": file}
        }, status=status.HTTP_201_CREATED)
