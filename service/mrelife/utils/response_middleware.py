import json


class ModifyResponseMiddleWare(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 200:
            data = {
                'status': True,
                'messageCode': '',
                'messageParams': {},
                'data': response.data
            }
            response.content = json.dumps(data)
        return response
