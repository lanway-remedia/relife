
from django.conf import settings


class CommonFuntion():
    def update_active(self, objectM):
        for item in objectM:
            item.is_active = settings.IS_INACTIVE
            item.updated = datetime.now()
            item.save()
