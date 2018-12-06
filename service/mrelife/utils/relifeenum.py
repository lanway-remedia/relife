from enum import Enum


class MessageCode(Enum):
    AU001 = 'AU001'  # Unauthorization or Forbidden
    AU002 = 'AU002'  #
    AU003 = 'AU003'  # Email or password incorrect
    SU001 = 'SU001'  # Success
    FA001 = 'FA001'  # Error

    OS001 = 'OS001'  # get outletstore's information detail successfully
    OS002 = 'OS002'  # get outletstore's information detail failly
    OS003 = 'OS002'  # add new a outletstore  successfully
    OS004 = 'OS004'  # not add new ouletstore
    OS005 = 'OS005'  # update information
    OS006 = 'OS006'  # update with err data
    OS007 = 'OS007'  # delete sussess
    OS008 = 'OS008'  # delete fail

    EX001 = 'EX001'  # get detail
    EX002 = 'EX002'  # get detail. not found request
    EX003 = 'EX003'  # create susscess
    EX004 = 'EX004'  # create with err data
    EX005 = 'EX005'  # update sussess
    EX006 = 'EX006'  # update with err data
    EX007 = 'EX007'  # delete sussess
    EX008 = 'EX008'  # delete fail

    EV001 = 'EV001'  # get detail
    EV002 = 'EV002'  # get detail. not found request
    EV003 = 'EV003'  # create susscess
    EV004 = 'EV004'  # create with err data
    EV005 = 'EV005'  # update sussess
    EV006 = 'EV006'  # update with err data
    EV007 = 'EV007'  # delete sussess
    EV008 = 'EV008'  # get detail

    EXT001 = 'EXT001'  # get detail
    EXT002 = 'EXT002'  # get detail. not found request
    EXT003 = 'EXT004'  # create susscess
    EXT004 = 'EXT005'  # create with err data
    EXT005 = 'EXT006'  # update sussess
    EXT006 = 'EXT007'  # update with err data
    EXT007 = 'EXT008'  # delete sussess
    EXT008 = 'EXT009'  # get detail

    OMH001 = 'OMH001'  # get detail
    OMH002 = 'OMH002'  # get detail. not found request
    OMH003 = 'OMH003'  # create susscess
    OMH004 = 'OMH004'  # create with err data
    OMH005 = 'OMH005'  # update sussess
    OMH006 = 'OMH006'  # update with err data
    OMH007 = 'OMH007'  # delete sussess
    OMH008 = 'OMH008'  # delete fail
    OMH009 = 'OMH009'  # feild status update success
    OMH010 = 'OMH010'  # not update fiedl status

    CAT001 = 'CAT001'  # create success
    CAT002 = 'CAT002'  # create with err data
    CAT003 = 'CAT003'  # invalid data
    CAT004 = 'CAT004'  # update success
    CAT005 = 'CAT005'  # update error
    CAT006 = 'CAT006'  # get list success
    CAT007 = 'CAT007'  # delete success

    TAG001 = 'TAG001'  # create success
    TAG002 = 'TAG002'  # create with err data
    TAG003 = 'TAG003'  # invalid data
    TAG004 = 'TAG004'  # update success
    TAG005 = 'TAG005'  # update error
    TAG006 = 'TAG006'  # get list success
    TAG007 = 'TAG007'  # delete success

    LOC001 = 'LOC001'  # create success
    LOC002 = 'LOC002'  # create with err data
    LOC003 = 'LOC003'  # invalid data
    LOC004 = 'LOC004'  # update success
    LOC005 = 'LOC005'  # update error
    LOC006 = 'LOC006'  # get list success
    LOC007 = 'LOC007'  # delete success
    LOC008 = 'LOC008'  # delete failed
