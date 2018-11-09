from enum import Enum

class MessageCode(Enum):
    AU001 = 'AU001' #Unauthorization or Forbidden
    SU001 = 'SU001' #Success
    FA001 = 'FA001' #Error
