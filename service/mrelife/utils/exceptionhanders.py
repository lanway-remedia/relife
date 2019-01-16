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
        print({"noi dung": response.status_code})
    if (response.status_code == 400):
        data = response.data
        response.data = {
            'status': False,
            'messageCode': MessageCode.DT001.value,
            'messageParams': data,
            'data': None
        }
    if (response.status_code == 404):
        response.data = {
            'status': False,
            'messageCode': MessageCode.DT002.value,
            'messageParams': {},
            'data': None
        }

    return response
