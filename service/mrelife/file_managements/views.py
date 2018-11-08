from django.core.files.storage import default_storage

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class MyUploadView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        if 'file' not in request.data:
            raise ParseError("Empty content")

        f = request.data['file']
        file = default_storage.save(f)

        return Response({"url": file}, status=status.HTTP_201_CREATED)
