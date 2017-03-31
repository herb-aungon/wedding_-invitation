
import  pprint, dpath.util, requests, datetime, json, bson, copy, calendar, collections
from bson.objectid import ObjectId

class wed_invi( ):
    def __init__(self, mongodb):
        self.__mongodb = mongodb
        self.__result = {'success':False, 'reason':None, 'data':None}
        self.__now = datetime.datetime.now() 
