def resultResponse(success, data, messageCode):
    if (success==True):
        result = {
            'status': True,
            'messageCode': messageCode,
            'messageParams': None,
            'data': data
        }
    else:
        result = {
            'status': False,
            'messageCode': messageCode,
            'messageParams': None,
            'data': data
        }
    return result