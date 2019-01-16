import re
from datetime import datetime

from django.conf import settings
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mrelife.attributes.models import SearchHistory
from mrelife.events.models import Event, EventContact, EventContactReply
from mrelife.events.serializers import EventContactReplySerializer, EventContactSerializer, EventSerializer
from mrelife.utils.event_permission import EventPermission
from mrelife.utils.groups import IsAdmin
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405


class EventViewSet(viewsets.ModelViewSet):

    queryset = Event.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        queryset = Event.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        keyword = request.GET.get('keyword')
        if keyword is not None:
            Sobject = SearchHistory.objects.filter(key_search=keyword)
            if not Sobject:
                p = SearchHistory.objects.create(key_search=keyword, num_result=1,
                                                 created=datetime.now(), updated=datetime.now())
                p.save()
            else:
                Sobject = SearchHistory.objects.get(key_search=keyword)
                Sobject.num_result += 1
                Sobject.updated = datetime.now()
                Sobject.save()
            self.queryset = queryset.filter(Q(title__contains=keyword) | Q(content__contains=keyword))
        response = super(EventViewSet, self).list(request)
        return response_200('DT003', '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = Event.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventSerializer(outletstoreObject)
            return response_200(MessageCode.EV001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EV009.value,{},{})
        except Http404:
            return response_404(MessageCode.EV002.value,{},{})

    def create(self, request):
        try:
            serializer = EventSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EV003.value,{},serializer.data)
            return response_405(MessageCode.EV010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.EV004.value,{},{})

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = Event.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            eventObj = get_object_or_404(queryset, pk=pk)
            serializer = EventSerializer(eventObj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return response_200(MessageCode.EV005.value,{},serializer.data)
            return response_405(MessageCode.EV011.value,serializer.errors,{})
        except KeyError:
            return response_400(MessageCode.EV009.value,{},{})
        except Http404:
            return response_404(MessageCode.EV012.value,{},{})
        except Exception as e:
            return response_400(MessageCode.EV006.value,{},{})

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = Event.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset = queryset.filter(create_user_id=request.user.id)
            event_obj = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = EventSerializer(event_obj, data=data, partial=True)
            if(serializer.is_valid()):
                serializer.save(updated=datetime.now())
                eventContactObject = EventContact.objects.filter(is_active=1, event_id=pk)
                if(eventContactObject):
                    for item in eventContactObject:
                        EventContactReply.objects.filter(is_active=1, event_contact_reply=eventContactObject.id).update(
                            is_active=settings.IS_INACTIVE, updated=datetime.now())
                eventContactObject.update(is_active=settings.IS_INACTIVE, updated=datetime.now())
                return response_200(MessageCode.EV007.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.EV009.value,{},{})
        except Http404:
            return response_404(MessageCode.EV013.value,{},{})
        except Exception as e:
            return response_400(MessageCode.EV008.value,{},{})