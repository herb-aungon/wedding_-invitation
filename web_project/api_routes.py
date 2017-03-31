import os
import logging
import json, calendar, datetime
from flask import Flask, request, render_template, make_response, jsonify
from jinja2 import Environment, PackageLoader
from pymongo import MongoClient
from bson import ObjectId

import local_settings
logging.basicConfig()

# Loading initial config
config = local_settings.env

client = MongoClient(config.get('MONGODB_HOST'))
mongodb = client[config.get('MONGODB_COLLECTION')]



app = Flask(__name__)
template_env = Environment(loader=PackageLoader('api_routes', 'templates'))

# Used to display errors on webpage       
@app.errorhandler( 500 )
def internal_500_error( exception ):
     app.logger.exception( exception )
     return pprint.pformat( exception ), 500

@app.errorhandler( 404 )
def internal_404_error( exception ):
     app.logger.exception( exception )
     return 'Portal<br/>\n%s<br/>\n%s' % ( exception, request.url ), 404

@app.errorhandler( 401 )
def internal_401_error( exception ):
     app.logger.exception( exception )
     return 'Portal<br/>\n%s<br/>\n%s' % ( exception, request.url ), 401


def default_encoder( obj, encoder=json.JSONEncoder() ):
    if isinstance( obj, ObjectId ): 
        return str( obj )  
    if isinstance(obj, datetime.datetime):
         date = datetime.date(obj.year, obj.month, obj.day)
         return str(date)#.strftime( '%Y-%m-%d' )
    return encoder.default( obj )


@app.route('/', methods=['GET'])
def home( ):
     return render_template('wedding.html')



@app.route('/rsvp', methods=['GET'])
def index( ):
     return render_template('wedding.html')



@app.route('/rsvp', methods=['POST'])
def post_rsvp( ):
     try:

          data_raw = request.data
          stp1  = data_raw.replace("{", "")
          stp2= stp1.replace("}", "")
          stp3 = stp2.replace("\"", "")
          stp4 = stp3.replace(",", "")
          list_data = stp4.split()
          data_dict = {
               "first_name":list_data[1],
               "last_name":list_data[3],
               "mobile":list_data[5],
               "guest":list_data[7],
               "message":list_data[9]

          }

          result = "Invitation for %s %s is confirmed!" % (data_dict.get("first_name"), data_dict.get("last_name"))
          
          resp = json.dumps (result, default=default_encoder, indent = 2, sort_keys = True)
 
          mongodb.invitation.insert(data_dict)

     except Exception as e:
          resp="Error!%s " % e

     return resp





@app.route('/admin', methods=['GET'])
def admin_get( ):
     try:
          # invitations = "test"
          invis_raw  = mongodb.invitation.find()
          invitations =[]# list(invis_raw )

          for x in invis_raw :
               invitations.append(x)

          resp = json.dumps(invitations, default=default_encoder, indent = 2, sort_keys = True)
     except Exception as e:
          resp="Error!%s " % e


     return resp




@app.route('/login', methods=['GET'])
def login_gey( ):
     return render_template('login.html')

@app.route('/rsvp', methods=['GET'])
def getr_svp( ):
     return render_template('rsvp.html')



if __name__ == "__main__":
     app.run(debug=True)
     pass
# else:
#      app.root_path = config.get( 'HOME_DIR' )

