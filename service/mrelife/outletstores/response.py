from rest_framework.response import Response
from rest_framework import status
#from django.template.response import SimpleTemplateResponse

#from rest_framework.decorators import api_view

class ResultOutputResponse():
    def __init__(self, data = None, statusCode=True, messageCode='MSG01'):
        self.OutputResponse(data, statusCode, messageCode)


    #@api_view(['GET','POST'])
    def OutputResponse(self, data, statusCode, messageCode):
        
        output = {
            "status": statusCode,
            "messageCode": messageCode,
            "data": data,
        }
        return Response(output, status=status.HTTP_200_OK)
