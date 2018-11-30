from enum import Enum


class MessageCode(Enum):
    AU001 = 'AU001'  # Unauthorization or Forbidden
    AU002 = 'AU002'  #
    AU003 = 'AU003'  # Email or password incorrect
    SU001 = 'SU001'  # Success
    FA001 = 'FA001'  # Error
    OT001 = 'OT001'  # get list
    OT002 = 'OT002'  # get detail
    OT003 = 'OT003'  # get detail. not found request
    OT004 = 'OT004'  # create susscess
    OT005 = 'OT005'  # create with err data
    OT006 = 'OT006'  # update sussess
    OT007 = 'OT007'  # update with err data
    OT008 = 'OT008'  # delete sussess
    OT009 = 'OT009'  # delete fail
    EX001 = 'EX001'  # get list
    EX002 = 'EX002'  # get detail
    EX003 = 'EX003'  # get detail. not found request
    EX004 = 'EX004'  # create susscess
    EX005 = 'EX005'  # create with err data
    EX006 = 'EX006'  # update sussess
    EX007 = 'EX007'  # update with err data
    EX008 = 'EX008'  # delete sussess
    EX009 = 'EX009'  # delete fail
    EV001 = 'EV001'  # get list
    EV002 = 'EV002'  # get detail
    EV003 = 'EV003'  # get detail. not found request
    EV004 = 'EV004'  # create susscess
    EV005 = 'EV005'  # create with err data
    EV006 = 'EV006'  # update sussess
    EV007 = 'EV007'  # update with err data
    EV008 = 'EV008'  # delete sussess
    EV009 = 'EV009'  # get detail
    EXT001 = 'EXT001'  # get list
    EXT002 = 'EXT002'  # get detail
    EXT003 = 'EXT003'  # get detail. not found request
    EXT004 = 'EXT004'  # create susscess
    EXT005 = 'EXT005'  # create with err data
    EXT006 = 'EXT006'  # update sussess
    EXT007 = 'EXT007'  # update with err data
    EXT008 = 'EXT008'  # delete sussess
    EXT009 = 'EXT009'  # get detail
    OMH001 = 'OMH001'  # get list
    OMH002 = 'OMH002'  # get detail
    OMH003 = 'OMH003'  # get detail. not found request
    OMH004 = 'OMH004'  # create susscess
    OMH005 = 'OMH005'  # create with err data
    OMH006 = 'OMH006'  # update sussess
    OMH007 = 'OMH007'  # update with err data
    OMH008 = 'OMH008'  # delete sussess
    OMH009 = 'OMH009'  # delete fail

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
