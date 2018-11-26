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
