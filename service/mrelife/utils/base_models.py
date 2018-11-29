from django.db.models import DateTimeField, ForeignKey, Model, CASCADE
from django.utils import timezone


class BaseModel(Model):
    created = DateTimeField(auto_now_add=True, null=True)
    updated = DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.created:
            self.created = timezone.now()

        self.updated = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)
