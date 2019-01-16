from enum import Enum


class MessageCode(Enum):
    AU001 = 'AU001'  # Unauthorization or Forbidden
    AU002 = 'AU002'  #
    AU003 = 'AU003'  # Email or password incorrect
    SU001 = 'SU001'  # Success
    FA001 = 'FA001'  # Error

    US111 = 'US111'  # create successfully
    US222 = 'US222'  # add  new user failly. Invalid Data
    US333 = 'US333'  # add  new user failly.
    
    DT001 = 'DT001'  # data: invalid input
    DT002 = 'DT002'  # data not found
    DT003 ='DT003'  # data: get list successfully


    US001 = 'US001'  # create successfully
    US002 = 'US002'  # add  new user failly. Invalid Data
    US003 = 'US003'  # add  new user failly.


    OS001 = 'OS001'  # get outletstore's information detail successfully
    OS002 = 'OS002'  # get outletstore's information detail failly
    OS003 = 'OS003'  # add new a outletstore  successfully
    OS004 = 'OS004'  # not add new ouletstore
    OS005 = 'OS005'  # update information
    OS006 = 'OS006'  # update with err data
    OS007 = 'OS007'  # delete sussess
    OS008 = 'OS008'  # delete fail
    OS009 = 'OS009'  # Invalid ID supplied
    OS010 = 'OS010'  # Not created new Outletstore : Invalid Data
    OS011 = 'OS011'  # Not updated Oultetstore : Invalid Data
    OS012 = 'OS012'  # Not updated Outletstore : Outletstore not  found
    OS013 = 'OS0013'  # Not deleted Outletstore : Outletstore not  found
    BSO003 = 'BSO003'  # register become store owner successfully
    BSO004 = 'BSO004'  # register become store owner failly
    BSO010 = 'BSO010'  # Not register become store: Invalid Data
    

    CM001 = 'CM001'  # get Commitment's information detail successfully
    CM002 = 'CM002'  # get Commitment's information detail failly
    CM003 = 'CM003'  # add new a Commitment  successfully
    CM004 = 'CM004'  # not add new Commitment
    CM005 = 'CM005'  # update information
    CM006 = 'CM006'  # update with err data
    CM007 = 'CM007'  # delete sussess
    CM008 = 'CM008'  # delete fail
    CM009 = 'CM009'  # Invalid ID supplied
    CM010 = 'CM010'  # Not created new Commitment :  Invalid Data
    CM011 = 'CM011'  # Not updated Oultetstore Contact : Invalid Data
    CM012 = 'CM012'  # Not updated Commitment: Commitment not found
    CM013 = 'CM013'  # Not deleted Commitment: Commitment not found

    OSC001 = 'OSC001'  # get outletstore contact's information detail successfully
    OSC002 = 'OSC002'  # get outletstore contact's information detail failly
    OSC003 = 'OSC003'  # add new a outletstore contact  successfully
    OSC004 = 'OSC004'  # not add new outletstore contact
    OSC005 = 'OSC005'  # update information
    OSC006 = 'OSC006'  # update with err data
    OSC007 = 'OSC007'  # delete sussess
    OSC008 = 'OSC008'  # delete fail
    OSC009 = 'OSC009'  # Invalid ID supplied
    OSC010 = 'OSC010'  # Not created new Outletstore Contact :  Invalid Data
    OSC011 = 'OSC011'  # Not updated Oultetstore Contact : Invalid Data
    OSC012 = 'OSC012'  # Not updated Outletstore Contact: Outletstore Contact not found
    OSC013 = 'OSC013'  # Not deleted Outletstore Contact: Outletstore Contact not found

    OSCR001 = 'OSCR001'  # get outletstore contact reply's information detail successfully
    OSCR002 = 'OSCR002'  # get outletstore contact reply's information detail failly
    OSCR003 = 'OSCR002'  # add new a outletstore contact successfully
    OSCR004 = 'OSCR004'  # not add new outletstore contact reply
    OSCR005 = 'OSCR005'  # update information
    OSCR006 = 'OSCR006'  # update with err data
    OSCR007 = 'OSCR007'  # delete sussess
    OSCR008 = 'OSCR008'  # delete fail
    OSCR009 = 'OSCR009'  # Invalid ID supplied

    OSR001 = 'OSR001'  # get outletstore review information detail successfully
    OSR002 = 'OSR002'  # getoutletstore review information detail failly
    OSR003 = 'OSR002'  # add new a outletstore review  successfully
    OSR004 = 'OSR004'  # not add new outletstore review
    OSR005 = 'OSR005'  # update information
    OSR006 = 'OSR006'  # update with err data
    OSR007 = 'OSR007'  # delete sussess
    OSR008 = 'OSR008'  # delete fail
    OSR009 = 'OSR009'  # Invalid ID supplied
    OSR010 = 'OSR010'  # Not created new Outletstore Review : Invalid Data
    OSR011 = 'OSR011'  # Not updated Oultetstore Review : Invalid Data
    OSR012 = 'OSR012'  # Not updated Outletstore Review: Outletstore Review not found
    OSR013 = 'OSR013'  # Not deleted Outletstore Review: Outletstore Review not found

    EX001 = 'EX001'  # get exhibition's information detail successfully
    EX002 = 'EX002'  # get exhibition's information detail failly
    EX003 = 'EX003'  # created exhibiton successfully
    EX004 = 'EX004'  # not add new exhibiton media
    EX005 = 'EX005'  # update sussess
    EX006 = 'EX006'  # update with err data
    EX007 = 'EX007'  # delete sussess
    EX008 = 'EX008'  # delete fail
    EX009 = 'EX009'  # Invalid ID supplied
    EX010 = 'EX010'  # Not created new Exhibition: Invalid Data
    EX011 = 'EX011'  # Not updated Exhibition: Invalid Data
    EX012 = 'EX012'  # Not updated Exhibition: Exhibition not found
    EX013 = 'EX013'  # Not deleted Exhibition: Exhibition not found

    EXC001 = 'EXC001'  # get exhibition contact information detail successfully
    EXC002 = 'EXC002'  # get exhibition contact's information detail failly
    EXC003 = 'EXC003'  # create susscess
    EXC004 = 'EXC004'  # create with err data
    EXC005 = 'EXC005'  # update sussess
    EXC006 = 'EXC006'  # update with err data
    EXC007 = 'EXC007'  # delete sussess
    EXC008 = 'EXC008'  # delete fail
    EXC009 = 'EXC009'  # Invalid ID supplied
    EXC010 = 'EXC010'  # Not created new exhibition contact: Invalid Data
    EXC011 = 'EXC011'  # Not updated exhibition contact: Invalid Data
    EXC012 = 'EXC012'  # Not updated exhibition contact: exhibition contact not found
    EXC013 = 'EXC013'  # Not deleted exhibition contact: exhibition contact not found

    EXCR001 = 'EXCR001'  # get exhibition contact reply's information detail successfully
    EXCR002 = 'EXCR002'  # get exhibition contact reply's information detail failly
    EXCR003 = 'EXCR003'  # create susscess
    EXCR004 = 'EXCR004'  # create with err data
    EXCR005 = 'EXCR005'  # update sussess
    EXCR006 = 'EXCR006'  # update with err data
    EXCR007 = 'EXCR007'  # delete sussess
    EXCR008 = 'EXCR008'  # delete fail
    EXCR009 = 'EXCR009'  # Invalid ID supplied
    EXCR010 = 'EXCR010'  # Not created new exhibition contact reply: Invalid Data
    EXCR011 = 'EXCR011'  # Not updated exhibition contact reply: Invalid Data
    EXCR012 = 'EXCR012'  # Not updated exhibition contact reply: exhibition contact reply not found
    EXCR013 = 'EXCR013'  # Not deleted exhibition contact reply: exhibition contact reply not found

    EXT001 = 'EXT001'  # get outletstore review information detail successfully
    EXT002 = 'EXT002'  # get detail. not found request
    EXT003 = 'EXT003'  # create susscess
    EXT004 = 'EXT004'  # create with err data
    EXT005 = 'EXT005'  # update sussess
    EXT006 = 'EXT006'  # update with err data
    EXT007 = 'EXT007'  # delete sussess
    EXT008 = 'EXT008'  # delete err
    EXT009 = 'EXT009'  # Invalid ID supplied
    EXT010 = 'EXT010'  # Not created new Exhibition Tag: Invalid Data
    EXT011 = 'EXT011'  # Not updated Exhibition Tag: Invalid Data
    EXT012 = 'EXT012'  # Not updated Exhibition Tag: Exhibition Tag not found
    EXT013 = 'EXT013'  # Not deleted Exhibition Tag: Exhibition Tag not found

    EV001 = 'EV001'  # get outletstore review information detail successfully
    EV002 = 'EV002'  # get detail. not found request
    EV003 = 'EV003'  # create susscess
    EV004 = 'EV004'  # create with err data
    EV005 = 'EV005'  # update sussess
    EV006 = 'EV006'  # update with err data
    EV007 = 'EV007'  # delete sussess
    EV008 = 'EV008'  # get detail
    EV009 = 'EV009'  # Invalid ID supplied
    EV010 = 'EV010'  # Not created new Event: Invalid Data
    EV011 = 'EV011'  # Not updated Event: Invalid Data
    EV012 = 'EV012'  # Not updated Event: Event not found
    EV013 = 'EV013'  # Not deleted Event: Event not found

    EVC001 = 'EVC001'  # get detail to Event contact
    EVC002 = 'EVC002'  # get detail. not found request
    EVC003 = 'EVC003'  # create susscess
    EVC004 = 'EVC004'  # create with err data
    EVC005 = 'EVC005'  # update sussess
    EVC006 = 'EVC006'  # update with err data
    EVC007 = 'EVC007'  # delete sussess
    EVC008 = 'EVC008'  # get detail
    EVC009 = 'EVC009'  # Invalid ID supplied
    EVC010 = 'EVC010'  # Not created new Event contact: Invalid Data
    EVC011 = 'EVC011'  # Not updated Event contact: Invalid Data
    EVC012 = 'EVC012'  # Not updated Event contact: Event contact not found
    EVC013 = 'EVC013'  # Not deleted Event contact: Event contact not found

    EVCR001 = 'EVCR001'  # get detail to Event Contact Reply
    EVCR002 = 'EVCR002'  # get detail. not found request
    EVCR003 = 'EVCR003'  # create susscess
    EVCR004 = 'EVCR004'  # create with err data
    EVCR005 = 'EVCR005'  # update sussess
    EVCR006 = 'EVCR006'  # update with err data
    EVCR007 = 'EVCR007'  # delete sussess
    EVCR008 = 'EVCR008'  # get detail
    EVCR009 = 'EVCR009'  # Invalid ID supplied
    EVCR010 = 'EVCR010'  # Not created new Event Contact Reply:  Invalid Data
    EVCR011 = 'EVCR011'  # Not updated Event Contact Reply: Invalid Data
    EVCR012 = 'EVCR012'  # Not updated Event Contact Reply: Event Contact Reply not found
    EVCR013 = 'EVCR013'  # Not deleted Event Contact Reply: Event Contact Reply not found

    EVMH001 = 'EVMH001'  # get detail
    EVMH002 = 'EVMH002'  # get detail. not found request
    EVMH003 = 'EVMH003'  # create susscess
    EVMH004 = 'EVMH004'  # create with err data
    EVMH005 = 'EVMH005'  # update sussess
    EVMH006 = 'EVMH006'  # update with err data
    EVMH007 = 'EVMH007'  # delete sussess
    EVMH008 = 'EVMH008'  # get detail
    EVMH009 = 'EVMH009'  # Invalid ID supplied
    EVMH010 = 'EVMH010'  # Not created new Event Model House:  Invalid Data
    EVMH011 = 'EVMH011'  # Not updated Event Model House: Invalid Data
    EVMH012 = 'EVMH012'  # Not updated Event Model House: Event Model House not found
    EVMH013 = 'EVMH013'  # Not deleted Event Model House: Event Model House not found

    EVE001 = 'EVE001'  # get detail
    EVE002 = 'EVE002'  # get detail. not found request
    EVE003 = 'EVE003'  # create susscess
    EVE004 = 'EVE004'  # create with err data
    EVE005 = 'EVE005'  # update sussess
    EVE006 = 'EVE006'  # update with err data
    EVE007 = 'EVE007'  # delete sussess
    EVE008 = 'EVE008'  # get detail
    EVE009 = 'EVE009'  # Invalid ID supplied
    EVE010 = 'EVE010'  # Not created new Event Exhibition: Invalid Data
    EVE011 = 'EVE011'  # Not updated Event Exhibition: Invalid Data
    EVE012 = 'EVE012'  # Not updated Event Exhibition: Event Exhibition not found
    EVE013 = 'EVE013'  # Not deleted Event Exhibition: Event Exhibition not found

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
    MHR009 = 'MHR009'  # Invalid ID supplied
    MHR010 = 'MHR010'  # Not created new model house review: Invalid Data
    MHR011 = 'MHR011'  # Not updated model house review: Invalid Data
    MHR012 = 'MHR012'  # Not updated model house review: model house review not found
    MHR013 = 'MHR013'  # Not deleted model house review: model house review not found

    EHR001 = 'EHR001'  # get example house review detail
    EHR002 = 'EHR002'  # get detail. not found request
    EHR003 = 'EHR003'  # create susscess
    EHR004 = 'EHR004'  # create with err data
    EHR005 = 'EHR005'  # update sussess
    EHR006 = 'EHR006'  # update with err data
    EHR007 = 'EHR007'  # delete sussess
    EHR008 = 'EHR008'  # delete fail
    EHR009 = 'EHR009'  # Invalid ID supplied
    EHR010 = 'EHR010'  # Not created new example house review: Invalid Data
    EHR011 = 'EHR011'  # Not updated example house review: Invalid Data
    EHR012 = 'EHR012'  # Not updated example house review: example house review not found
    EHR013 = 'EHR013'  # Not deleted example house review: example house review not found

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
