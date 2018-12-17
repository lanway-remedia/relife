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

    OSC001 = 'OSC001'  # get outletstore contact's information detail successfully
    OSC002 = 'OSC002'  # get outletstore contact's information detail failly
    OSC003 = 'OSC003'  # add new a outletstore contact  successfully
    OSC004 = 'OSC004'  # not add new outletstore contact
    OSC005 = 'OSC005'  # update information
    OSC006 = 'OSC006'  # update with err data
    OSC007 = 'OSC007'  # delete sussess
    OSC008 = 'OSC008'  # delete fail

    OSCR001 = 'OSCR001'  # get outletstore contact reply's information detail successfully
    OSCR002 = 'OSCR002'  # get outletstore contact reply's information detail failly
    OSCR003 = 'OSCR002'  # add new a outletstore contact  successfully
    OSCR004 = 'OSCR004'  # not add new outletstore contact reply
    OSCR005 = 'OSCR005'  # update information
    OSCR006 = 'OSCR006'  # update with err data
    OSCR007 = 'OSCR007'  # delete sussess
    OSCR008 = 'OSCR008'  # delete fail

    OSM001 = 'OSM001'  # get outletstore media's information detail successfully
    OSM002 = 'OSM002'  # get outletstore media's information detail failly
    OSM003 = 'OSM002'  # add new a outletstore media  successfully
    OSM004 = 'OSM004'  # not add new outletstore media
    OSM005 = 'OSM005'  # update information
    OSM006 = 'OSM006'  # update with err data
    OSM007 = 'OSM007'  # delete sussess
    OSM008 = 'OSM008'  # delete fail

    EX001 = 'EX001'  # get exhibition's information detail successfully
    EX002 = 'EX002'  # get exhibition's information detail failly
    EX003 = 'EX003'  # created exhibiton successfully
    EX004 = 'EX004'  # not add new exhibiton media
    EX005 = 'EX005'  # update sussess
    EX006 = 'EX006'  # update with err data
    EX007 = 'EX007'  # delete sussess
    EX008 = 'EX008'  # delete fail

    EXC001 = 'EXC001'  # get detail
    EXC002 = 'EXC002'  # get detail. not found request
    EXC003 = 'EXC003'  # create susscess
    EXC004 = 'EXC004'  # create with err data
    EXC005 = 'EXC005'  # update sussess
    EXC006 = 'EXC006'  # update with err data
    EXC007 = 'EXC007'  # delete sussess
    EXC008 = 'EXC008'  # delete fail

    EXCR001 = 'EXCR001'  # get detail
    EXCR002 = 'EXCR002'  # get detail. not found request
    EXCR003 = 'EXCR003'  # create susscess
    EXCR004 = 'EXCR004'  # create with err data
    EXCR005 = 'EXCR005'  # update sussess
    EXCR006 = 'EXCR006'  # update with err data
    EXCR007 = 'EXCR007'  # delete sussess
    EXCR008 = 'EXCR008'  # delete fail

    EV001 = 'EV001'  # get detail
    EV002 = 'EV002'  # get detail. not found request
    EV003 = 'EV003'  # create susscess
    EV004 = 'EV004'  # create with err data
    EV005 = 'EV005'  # update sussess
    EV006 = 'EV006'  # update with err data
    EV007 = 'EV007'  # delete sussess
    EV008 = 'EV008'  # get detail

    EVMH001 = 'EVMH001'  # get detail
    EVMH002 = 'EVMH002'  # get detail. not found request
    EVMH003 = 'EVMH003'  # create susscess
    EVMH004 = 'EVMH004'  # create with err data
    EVMH005 = 'EVMH005'  # update sussess
    EVMH006 = 'EVMH006'  # update with err data
    EVMH007 = 'EVMH007'  # delete sussess
    EVMH008 = 'EVMH008'  # get detail

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

    MHR001 = 'MHR001'  # get model house review detail
    MHR002 = 'MHR002'  # get detail. not found request
    MHR003 = 'MHR003'  # create susscess
    MHR004 = 'MHR004'  # create with err data
    MHR005 = 'MHR005'  # update sussess
    MHR006 = 'MHR006'  # update with err data
    MHR007 = 'MHR007'  # delete sussess
    MHR008 = 'MHR008'  # delete fail

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
