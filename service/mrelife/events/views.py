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

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.events.models import Event, EventContact, EventContactReply
from mrelife.events.serializers import EventContactReplySerializer, EventContactSerializer, EventSerializer
from mrelife.utils.event_permission import EventPermission
from mrelife.utils.groups import IsAdmin
from mrelife.utils.relifeenum import MessageCode


class EventViewSet(viewsets.ModelViewSet):

    queryset = Event.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = EventSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (EventPermission,)
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = Event.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        return super(EventViewSet, self).list(request)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = Event.objects.filter(is_active=settings.IS_ACTIVE)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = EventSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV001.value, ""), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV002.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            serializer = EventSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV003.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV004.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = Event.objects.filter(is_active=settings.IS_ACTIVE)
            if not IsAdmin(request.user):
                queryset=queryset.filter(create_user_id=request.user.id)
            eventObj = get_object_or_404(queryset, pk=pk)
            serializer = EventSerializer(eventObj, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV005.value, ""), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV012.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV006.value, {}), status=status.HTTP_400_BAD_REQUEST)

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
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.EV007.value, ""), status=status.HTTP_200_NO_CONTENT)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV013.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.EV008.value, {}), status=status.HTTP_400_BAD_REQUEST)
