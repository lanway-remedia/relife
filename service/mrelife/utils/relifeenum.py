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
