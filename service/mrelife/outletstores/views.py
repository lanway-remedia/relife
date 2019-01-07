import re
from datetime import datetime

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mrelife.commons.common_fnc import CommonFuntion
from mrelife.outletstores.models import OutletStore, OutletStoreContact,OutletStoreBusiness
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.relifeenum import MessageCode
from django.http import HttpResponse 
from url_filter.integrations.drf import DjangoFilterBackend
from mrelife.utils.custom_exception import CustomException
from django.db.models import Q

class OutletStoreViewSet(viewsets.ModelViewSet):
    queryset = OutletStore.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
    serializer_class = OutletStoreSerializer
    permission_classes = (OutletStorePermission,)
    pagination_class = LimitOffsetPagination
    lookup_field = 'pk'
    lookup_value_regex = '[^/]+'
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['city_id','type','min_price','max_price','business']
    def list(self, request):
        self.queryset = OutletStore.objects.filter(is_active=settings.IS_ACTIVE).order_by('-updated')
        keyword= request.GET.get('keyword')
        if keyword is not None:
            self.queryset = self.queryset.filter(Q(title__contains=keyword) | Q(
                title__contains=keyword) )
        return super(OutletStoreViewSet, self).list(request)

    def retrieve(self, request, *args, **kwargs):
        try:
            pk = kwargs['pk']
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStore.objects.all().filter(is_active=1).filter(is_active=settings.IS_ACTIVE).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreSerializer(outletstoreObject)
            return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OS001.value, {}), status=status.HTTP_200_OK)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS002.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS002.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            serializer = OutletStoreSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                listbusinessid = request.data.get('new_business')
                if listbusinessid is not None:
                    for bu_id in listbusinessid:
                            OutletStoreBusiness.objects.create(
                                business=bu_id, outlet_store_id=serializer.data['id'],is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OS003.value, {}), status=status.HTTP_201_CREATED)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS010.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS004.value, {}), status=status.HTTP_400_BAD_REQUEST)
    def updatebessiness(self,pk,datainsert, datarevote):
        if datainsert is not None:
            for bu_id in datainsert:
                OutletStoreBusiness.objects.create(
                                business=bu_id, outlet_store_id=pk,is_active=settings.IS_ACTIVE, created=datetime.now(), updated=datetime.now())
            if datarevote is not None:
                for tag_id in datarevote:
                    outbusiness = OutletStoreBusiness.objects.all().filter(id=pk)
                    if(outbusiness is not None):
                        for item in outbusiness:
                            item.is_active = 0
                            item.updated = datetime.now()
                            item.save()
    def update(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStore.objects.filter(is_active=1)
            if(IsStore(request.user)):
                queryset = OutletStore.objects.filter(create_user_id=request.user.id, is_active=1,pk=pk)
                if not queryset:
                    exception = CustomException()
                    exception.set_error_code(status.HTTP_401_UNAUTHORIZED, "", "")
                    raise exception
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreSerializer(outletstoreObject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(create_user_id=request.user.id, is_active=settings.IS_ACTIVE,
                                created=datetime.now(), updated=datetime.now())
                newoutbusiness = request.data.get('new_business')
                removebusiness = request.data.get('remove_business')
                self.updatebessiness(pk,newoutbusiness,removebusiness)
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OS005.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS011.value, serializer.errors), status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS012.value, {}), status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS006.value, {}), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStore.objects.filter(is_active=1)
            if(IsStore(request.user)):
                queryset = OutletStore.objects.filter(create_user_id=request.user.id, is_active=1,pk=pk)
                if not queryset:
                    exception = CustomException()
                    exception.set_error_code(status.HTTP_401_UNAUTHORIZED, "", "")
                    raise exception
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            data = {"is_active": settings.IS_INACTIVE}
            serializer = OutletStoreSerializer(outletstoreObject, data=data, partial=True)
            if serializer.is_valid():
                serializer.save(updated=datetime.now())
                outletContact = OutletStoreContact.objects.filter(is_active=1, outlet_store_id=outletstoreObject.id).update(
                    is_active=settings.IS_INACTIVE, updated=datetime.now())
                outbusiness=OutletStoreBusiness.objects.filter(outlet_store_id=pk).update(is_active=settings.IS_INACTIVE, updated=datetime.now())
                return Response(CommonFuntion.resultResponse(True, serializer.data, MessageCode.OS007.value, {}), status=status.HTTP_200_OK)
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS008.value, serializer.errors), status=status.HTTP_404_BAD_REQUEST)
        except KeyError:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS009.value, {}), status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS013.value, {}), status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(CommonFuntion.resultResponse(False, "", MessageCode.OS008.value, {}), status=status.HTTP_400_BAD_REQUEST)
