import os
from io import BytesIO

from django.core.files.storage import default_storage as storage
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import (CASCADE, BooleanField, CharField, DateTimeField,
                              ForeignKey, ImageField, PositiveIntegerField,
                              SmallIntegerField, TextField,IntegerField)
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from PIL import Image

from mrelife.attributes.models import (Commitment, Contruction, Floor,
                                       HouseHoldIncome, HouseHoldSize,
                                       PriceRange, Style)
from mrelife.outletstores.models import OutletStore
from mrelife.tags.models import Tag
from mrelife.utils.base_models import BaseModel,Model



class ExampleHouse(BaseModel):
    title = CharField(max_length=255, null=False)
    content = TextField(null=False)
    store = ForeignKey('outletstores.OutletStore', related_name="example_houses",
                       on_delete=CASCADE, blank=True, null=True)
    contruction = ForeignKey(Contruction, related_name="example_houses",
                             on_delete=CASCADE, blank=True, null=True)
    price_range = ForeignKey(PriceRange, related_name="example_houses",
                             on_delete=CASCADE, blank=True, null=True)
    floor = ForeignKey(Floor, related_name="example_houses",
                       on_delete=CASCADE, blank=True, null=True)
    household_size = ForeignKey(HouseHoldSize, related_name="example_houses",
                                on_delete=CASCADE, blank=True, null=True)
    househole_income = ForeignKey(HouseHoldIncome, related_name="example_houses",
                                  on_delete=CASCADE, blank=True, null=True)

    create_user = ForeignKey('users.User', related_name="creating_example_houses",
                             on_delete=CASCADE, null=True, blank=True)
    img_thumbnail = CharField(max_length=800, null=True, blank=True)
    img_large = ImageField(null=True, blank=True)

    view_count = PositiveIntegerField(default=0)

    status_flag = BooleanField(default=True)
    is_active = BooleanField(default=True)

    def save(self, *args, **kwargs):
        super(ExampleHouse, self).save(*args, **kwargs)
        self.create_thumb()

    def create_thumb(self):
        if not self.img_large:
            return ""
        file_path = self.img_large.name
        filename_base, filename_ext = os.path.splitext(file_path)
        thumb_file_path = "%s_thumb.jpg" % filename_base
        if storage.exists(thumb_file_path):
            return "exists"
        try:
            # resize the original image and return url path of the thumbnail
            f = storage.open(file_path, 'r')
            image = Image.open(f)
            width, height = image.size
            basewidth = 300

            wpercent = (basewidth / float(width))
            hsize = int((float(height) * float(wpercent)))
            image = image.resize((basewidth, hsize), Image.ANTIALIAS)

            f_thumb = storage.open(thumb_file_path, "wb")
            out_im2 = BytesIO()
            image.save(out_im2, "JPEG")
            f_thumb.write(out_im2.getvalue())
            f_thumb.close()
            self.img_thumbnail = thumb_file_path
            self.save()
            return "success"
        except:
            return "error"


class ExampleHouseTag(BaseModel):

    example_house = ForeignKey(ExampleHouse, related_name="ex_tags", on_delete=CASCADE)
    tag = ForeignKey(Tag, related_name="example_houses", on_delete=CASCADE)
    is_active = BooleanField(default=True)


class ExampleHouseStyle(BaseModel):

    example_house = ForeignKey(ExampleHouse, related_name="styles", on_delete=CASCADE)
    style = ForeignKey(Style, related_name="example_houses", on_delete=CASCADE)
    is_active = BooleanField(default=True)


class ExampleHouseCommitment(BaseModel):

    example_house = ForeignKey(ExampleHouse, related_name="commitments", on_delete=CASCADE)
    commitment = ForeignKey(Commitment, related_name="example_houses", on_delete=CASCADE)
    is_active = BooleanField(default=True)


class ExampleHouseReview(Model):
    rating = IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    review = TextField()
    example_house = ForeignKey(ExampleHouse, related_name='example_house_review', on_delete=CASCADE)
    create_user = ForeignKey('users.User', related_name='create_user_example_house_review', on_delete=CASCADE)
    update_user = ForeignKey('users.User', related_name='update_user_example_house_review', on_delete=CASCADE)
    is_active = BooleanField(default=True)
    created = DateTimeField(auto_now_add=False, blank=True)
    updated = DateTimeField(auto_now_add=False, blank=True)

    class Meta:
        db_table = 'example_house_review'
        ordering = ['created', ]