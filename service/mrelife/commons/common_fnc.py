
import datetime

from django.conf import settings
from rest_framework.response import Response


class CommonFuntion():
    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()

    def resultResponse(status, data, messageCode, messageParams):
        result = {
            'status': status,
            'messageCode': messageCode,
            'messageParams': messageParams,
            'data': data
        }
        return result
