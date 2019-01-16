import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405

from mrelife.exhibitions.exhibitioncontactreplys.serializers import ExhibitionContactReplySerializer
from mrelife.exhibitions.models import ExhibitionContactReply
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.exhibition_permission import ExhibitionContactPermission


class ExhibitionContactReplyViewSet(viewsets.ModelViewSet):

    queryset = ExhibitionContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = ExhibitionContactReplySerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (ExhibitionContactPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = ExhibitionContactReply.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(ExhibitionContactReplyViewSet, self).list(request)
        return response_200(MessageCode.DT003, '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContactReply.objects.all()
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactReplySerializer(outletstoreObject)
            return response_200(MessageCode.EXCR001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EXCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXCR002.value,{},{})

    def create(self, request):
        try:
            serializer = ExhibitionContactReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EXCR003.value,{},serializer.data)
            return response_405(MessageCode.EXCR010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EXCR008.value,{e},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContactReply.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            serializer = ExhibitionContactReplySerializer(event_obj, data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id)
                return response_200(MessageCode.EXCR005.value,{},serializer.data)
            return response_405(MessageCode.EXCR011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EXCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXCR012.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = ExhibitionContactReply.objects.all()
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = ExhibitionContactReplySerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                return response_200(MessageCode.EXCR007.value,{},serializer.data)
            return response_405(MessageCode.EXCR008.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EXCR009.value,{},{})
        except Http404:
            return response_404(MessageCode.EXCR013.value,{},{})
