from datetime import datetime

from django.conf import settings
from django.db import transaction
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.events.models import EventExhibition
from mrelife.exhibitions.models import (Exhibition, ExhibitionContact,
                                        ExhibitionContactReply, ExhibitionTag)
from mrelife.exhibitions.serializers import (ExhibitionContactReplySerializer,
                                             ExhibitionContactSerializer,
                                             ExhibitionSerializer)
from mrelife.tags.models import Tag
from mrelife.utils import result
from mrelife.utils.relifeenum import MessageCode


class EhibitionViewSet(viewsets.ModelViewSet):

    queryset = Exhibition.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExhibitionSerializer
    pagination_class = LimitOffsetPagination
    #permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        self.queryset = Exhibition.objects.filter(is_active=settings.IS_ACTIVE).order_by("-updated")
        return super(EhibitionViewSet, self).list(request, *args, **kwargs)

    def retrieve(self, request, pk=None):
        try:
            queryset = Exhibition.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EX001.value, ""), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX002.value, ""), status=status.HTTP_404_NOT_FOUND)

    @transaction.atomic
    def create(self, request):
        try:
            self.parser_class = (FormParser, MultiPartParser)
            serializer = ExhibitionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                tags = request.data.get('tags')
                if tags is not None:
                    for tag_name in tags:
                        if not (tag_name == '' or tag_name is None):
                            tag, created = Tag.objects.get_or_create(name=tag_name)
                            ExhibitionTag.objects.create(
                                tag_id=tag.id, exhibition_id=serializer.data['id'], created=datetime.now(), updated=datetime.now())
                queryset = Exhibition.objects.all()
                outletstoreObject = get_object_or_404(queryset, pk=serializer.data['id'])
                serializer = ExhibitionSerializer(outletstoreObject)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EX003.value, ""), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX004.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            transaction.set_rollback(True)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX004.value, print(e)), status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def update(self, request, pk=None):
        try:
            queryset = Exhibition.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            self.parser_class = (FormParser, MultiPartParser)
            serializer = ExhibitionSerializer(event_obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, updated=datetime.now())
                newtags = request.data.get('newtags')
                if newtags is not None:
                    for tag_name in newtags:
                        if not (tag_name == '' or tag_name is None):
                            tag, created = Tag.objects.get_or_create(name=tag_name)
                            ExhibitionTag.objects.create(
                                tag_id=tag.id, exhibition_id=serializer.data['id'], created=datetime.now(), updated=datetime.now())
                removetags = request.data.get('removetags')
                if removetags is not None:
                    for tag_id in removetags:
                        exhibitiontags = ExhibitionTag.objects.all().filter(tag_id=tag_id, exhibition_id=pk)
                        if(exhibitiontags is not None):
                            for exhibitiontag in exhibitiontags:
                                exhibitiontag.is_active = 0
                                exhibitiontag.updated = datetime.now()
                                exhibitiontag.save()
                queryset = Exhibition.objects.all()
                outletstoreObject = get_object_or_404(queryset, pk=serializer.data['id'])
                serializer = ExhibitionSerializer(outletstoreObject)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EX005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX006.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            transaction.set_rollback(True)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX006.value, e), status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def destroy(self, request, pk=None):
        try:
            queryset = Exhibition.objects.all()
            exhibitionObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionSerializer(exhibitionObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                eCObjectlist = ExhibitionContact.objects.filter(is_active=1, exhibition_id=pk)
                for item in eCObjectlist:
                    ExhibitionContactReply.objects.select_related().filter(exhibition_contact_id=item.id).update(
                        is_active=settings.IS_INACTIVE, updated=datetime.now())
                ExhibitionContact.objects.select_related().filter(exhibition_id=pk).update(
                    is_active=settings.IS_INACTIVE, updated=datetime.now())
                EventExhibition.objects.select_related().filter(exhibition_id=pk).update(
                    is_active=settings.IS_INACTIVE, updated=datetime.now())
                ExhibitionTag.objects.select_related().filter(exhibition_id=pk).update(
                    is_active=settings.IS_INACTIVE, updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EX007.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX008.value, serializer.errors), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            transaction.set_rollback(True)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EX008.value, ""), status=status.HTTP_400_BAD_REQUEST)
    # @action(detail=False, methods=['DELETE'], url_path='deletex', url_name='deletex')
    # def Deletex(self, request, pk=None):
    #     listobject = Exhibition.objects.all().filter(is_active=1)
    #     for item in listobject:
    #         if(item.id > 10):
    #             item.delete()
    #     return Response({"status": "true"})
