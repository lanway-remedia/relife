import re
import socket
import sys
from datetime import datetime

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMessage, EmailMultiAlternatives, send_mail
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.template import Context
from django.template.loader import get_template, render_to_string
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import (action, detail_route, list_route,
                                       permission_classes)
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.outletstores.models import OutletStore, OutletStoreContact
from mrelife.outletstores.ouletstorecontacts.serializers import (OutletStoreContactSerializer,
                                                                 StatusRequestSerializer)
from mrelife.users.models import User
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStoreContactPermission
from mrelife.utils.relifeenum import MessageCode
from mrelife.utils.response import (response_200)

class OutletStoreContactViewSet(viewsets.ModelViewSet):
    queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreContactSerializer
    # permission_classes = (OutletStoreContactPermission,)
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'

    def list(self, request):
        self.queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        response = super(OutletStoreContactViewSet, self).list(request)
        return response_200('', '', response.data)

    def retrieve(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContact.objects.filter(is_active=1).filter(is_active=1).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreContactSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSC001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC002.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def sendEmailConfirmContact(self, request, subject, data, mailfrom, mailto1, mailto2):
        try:
            ip = socket.gethostbyname(socket.gethostname())
            base_url = "{0}://{1}".format(request.scheme, request.get_host())
            print('base'+base_url)
            domain = settings.URL_IMAGE
            data['domain'] = domain
            html_content = render_to_string('email.html', data)
            text_content = 'This is an important message.'
            email = EmailMultiAlternatives('Subject', text_content)
            email.attach_alternative(html_content, "text/html")
            email.to = [mailto1, mailto2]
            return email.send()
        except Exception as e:
            return False

    def create(self, request):
        try:
            serializer = OutletStoreContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                            created=datetime.now(), updated=datetime.now())
                userCreate = OutletStore.objects.get(id=request.data['outlet_store_id']).create_user
                statusSendMail = self.sendEmailConfirmContact(request, "Wellcome to outlet store", serializer.data,
                                                          settings.DEFAULT_FROM_EMAIL, request.data['email'], userCreate.email)
                if(not statusSendMail):
                    return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC004.value, {}), status=status.HTTP_400_BAD_REQUEST)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSC003.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC004.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContact.objects.filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreContactSerializer(outletstoreObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                userCreate = OutletStore.objects.get(id=request.data['outlet_store_id']).create_user
                self.sendEmailConfirmContact("Wellcome to outlet store", serializer.data,
                                             settings.DEFAULT_FROM_EMAIL, request.data['email'], userCreate.email)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSC005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC012.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC006.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContact.objects.filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreContactSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSC007.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC008.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC013.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC008.value, {}), status=status.HTTP_400_BAD_REQUEST)

    @list_route()
    def deleteall(self, request):
        queryset = OutletStoreContact.objects.all().delete()
        return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC008.value, {}), status=status.HTTP_204_NO_CONTENT)


class OutletStoreUpdatestatus(GenericAPIView, UpdateModelMixin):
    queryset = OutletStoreContact.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = StatusRequestSerializer
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'
    def put(self, request, pk=None, *args, **kwargs):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStoreContact.objects.filter(is_active=1)
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = StatusRequestSerializer(outletstoreObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OSC005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC011.value, ""), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC012.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OSC006.value, {}), status=status.HTTP_400_BAD_REQUEST)
