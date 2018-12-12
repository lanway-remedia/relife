import json


class ModifyResponseMiddleWare(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        print(response.content)
        if response.status_code < 299:
            try:
                if not "messageCode" in response.data:
                    data = {
                        'status': True,
                        'messageCode': '',
                        'messageParams': {},
                        'data': response.data
                    }
                    response.content = json.dumps(data)
            except Exception:
                pass
        return response
