from import_export import resources
from mrelife.attributes.models import Contruction, PriceRange, Floor, Style, Commitment, HouseHoldSize, HouseHoldIncome,Commitment


class ContructionResource(resources.ModelResource):
    class Meta:
        model = Contruction
        fields = ('id', 'title', 'order')


class PriceRangeResource(resources.ModelResource):
    class Meta:
        model = PriceRange
        fields = ('id', 'title', 'order')


class FloorResource(resources.ModelResource):
    class Meta:
        model = Floor
        fields = ('id', 'title', 'order')


class StyleResource(resources.ModelResource):
    class Meta:
        model = Style
        fields = ('id', 'title', 'order')
class CommitmentResource(resources.ModelResource):
    class Meta:
        model = Commitment
        fields = ('id', 'title', 'order')


class CommitmentResource(resources.ModelResource):
    class Meta:
        model = Commitment
        fields = ('id', 'title', 'order')


class HouseHoldSizeResource(resources.ModelResource):
    class Meta:
        model = HouseHoldSize
        fields = ('id', 'title', 'order')


class HouseHoldIncomeResource(resources.ModelResource):
    class Meta:
        model = HouseHoldIncome
        fields = ('id', 'title', 'order')
