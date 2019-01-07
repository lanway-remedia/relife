from rest_framework.exceptions import APIException


class CustomException(APIException):
    status_code = 401
    default_detail = 'Service temporarily unavailable, try again later.'
    default_code = 'service_unavailable'

    def set_error_code(self, status_code, error_code, error_detail):
        self.status_code = status_code
        self.default_code = error_code
        self.default_detail = error_detail
        self.detail = error_detail
