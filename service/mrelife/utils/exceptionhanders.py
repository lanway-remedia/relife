from rest_framework.views import exception_handler

from mrelife.utils.relifeenum import MessageCode


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if (response.status_code == 401) or (response.status_code == 403):
        response.data = {
            'status': False,
            'messageCode': MessageCode.AU001.value,
            'messageParams': None,
            'data': None
        }

    return response
