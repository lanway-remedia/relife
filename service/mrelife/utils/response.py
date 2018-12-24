"""
    Custom Response
    - Bin
"""
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_405_METHOD_NOT_ALLOWED, HTTP_503_SERVICE_UNAVAILABLE)


def response_400(code, message='', data=''):
    """
        Return 400
    """
    return Response({
        'status': False,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_400_BAD_REQUEST)


def response_404(code, message='', data=''):
    """
        Return 404
    """
    return Response({
        'status': False,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_404_NOT_FOUND)


def response_405(code, message='', data=''):
    """
        Return 405
    """
    return Response({
        'status': False,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_405_METHOD_NOT_ALLOWED)


def response_503(code, message='', data=''):
    """
        Return 503
    """
    return Response({
        'status': False,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_503_SERVICE_UNAVAILABLE)


def response_200(code, message='', data=''):
    """
        Return 200
    """
    return Response({
        'status': True,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_200_OK)


def response_201(code, message='', data=''):
    """
        Return 201
    """
    return Response({
        'status': True,
        'messageCode': code,
        'messageParams': message,
        'data': data
    }, status=HTTP_201_CREATED)
