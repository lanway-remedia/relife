"""
    Custom Response
    - Bin
"""
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND


def response_404(code, message='', data={}):
    """
        Return 404
    """
    return Response({
        'status': False,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_404_NOT_FOUND)
