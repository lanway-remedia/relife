import re
from datetime import datetime
from django.db.models import Q

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


from mrelife.outletstores.models import OutletStore, OutletStoreContact,OutletStoreBusiness
from mrelife.outletstores.serializers import OutletStoreSerializer
from mrelife.utils import result
from mrelife.utils.groups import GroupUser, IsAdmin, IsStore, IsSub
from mrelife.attributes.models import SearchHistory
from mrelife.utils.outlet_store_permission import OutletStorePermission
from mrelife.utils.response import response_200, response_201, response_400, response_404, response_405
from mrelife.utils.relifeenum import MessageCode
from django.http import HttpResponse 
from url_filter.integrations.drf import DjangoFilterBackend
from mrelife.utils.custom_exception import CustomException



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
            Sobject=SearchHistory.objects.filter(key_search=keyword)
            if not Sobject:
               p= SearchHistory.objects.create(key_search=keyword,num_result=1,created=datetime.now(), updated=datetime.now())
               p.save()
            else:
                Sobject=SearchHistory.objects.get(key_search=keyword)
                Sobject.num_result+=1
                Sobject.updated=datetime.now()
                Sobject.save()
            self.queryset = self.queryset.filter(Q(title__contains=keyword) | Q(
                content__contains=keyword) )
        response = super(OutletStoreViewSet, self).list(request)
        return response_200('DT003', '', response.data)

    def retrieve(self, request, *args, **kwargs):
        try:
            pk = kwargs['pk']
            parten = "^[0-9]+$"
            if not re.findall(parten, str(pk)):
                raise KeyError
            queryset = OutletStore.objects.all().filter(is_active=1).filter(is_active=settings.IS_ACTIVE).order_by("-updated")
            outletstoreObject = get_object_or_404(queryset, pk=pk)
            serializer = OutletStoreSerializer(outletstoreObject)
            return response_200(MessageCode.OS001.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.OS009.value,{},{})
        except Http404:
            return response_404(MessageCode.OS002.value,{},{})

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
                return response_200(MessageCode.OS003.value,{},serializer.data)
            return  response_405(MessageCode.OS010.value,serializer.errors,{})
        except Exception as e:
            return response_400(MessageCode.OS004.value,{},{})
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
                queryset=None
                store=request.user.store
                if store:
                    if store.id==int(pk):
                        queryset = OutletStore.objects.filter( is_active=1,pk=pk)
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
                return response_200(MessageCode.OS005.value,{},serializer.data)
            return  response_405(MessageCode.OS011.value,serializer.errors,{}) 
        except KeyError:
            return   response_400(MessageCode.OS009.value,{},{}) 
            return   response_404(MessageCode.OS012.value,{},{})
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
                return  response_200(MessageCode.OS007.value,{},serializer.data)
        except KeyError:
            return response_400(MessageCode.OS009.value,{},{}) 
        except Http404:
            return response_404(MessageCode.OS013.value,{},{}) 
