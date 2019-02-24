from flask import Flask, request
import pyrebase
# from clarifai.rest import ClarifaiApp
import requests
import json
from requests.auth import HTTPBasicAuth
from flask_cors import CORS
from GPSPhoto import gpsphoto as gp
import urllib
import os
from geopy.distance import geodesic


app = Flask(__name__)
CORS(app)


config = {
    "apiKey": "AIzaSyAviP5BdXqcBr409cY78pu0goV60t_uofY",
    "authDomain": "developer-week-2019.firebaseapp.com",
    "databaseURL": "https://developer-week-2019.firebaseio.com",
    "storageBucket": "developer-week-2019.appspot.com",
    "serviceAccount": "./auth/developer-week-2019-firebase-adminsdk-oclw1-32519cf1de.json"
}

firebase = pyrebase.initialize_app(config)


db = firebase.database()
storage = firebase.storage()


@app.route("/")
def hello():
    return "Food!"


def upload_image(local_pth):
    print(local_pth)
    storage.child(local_pth).put(local_pth)


def get_url(pth):
    url = storage.child(pth).get_url(None)
    print(url)
    return url

#downloads image temporarily, extracts location data if possible and returns
def get_image_location(url):
    urllib.request.urlretrieve(url,"tempimg.jpg")
    data = gp.getGPSData("tempimg.jpg")
    lat = data.get("Latitude")
    longe = data.get("Longitude")
    os.remove("tempimg.jpg")
    if(lat!=None and longe!=None):
        return {"latitude":lat, "longitude":longe}
    return None

#classigies any image with the general classifier
def classify_image(url):
    data = '''
    {
      "inputs": [
        {
          "data": {
            "image": {
              "url": "''' + url + '''"
            }
          }
        }
      ]
    }'''
    headers = {'Authorization': 'Key 53785869e72f4901a7f93891241cdc10',
               'Content-type': 'application/json'}
    res = requests.post(url="https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
                        headers=headers, data=data)

    txt = res.json()

    raw_data = txt.get('outputs')[0].get('data').get('concepts')

    return raw_data


#function to get nearby images given a latitude and longitude for the center point
#returns list of nearby images with user, classification, distance, and latitude/longitude
@app.route("/get_nearby_images", methods=["GET", "POST"])
def get_nearby_images():
    print("getting nearby images")
    #
    data = request.get_json(force=True)
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    center = (latitude,longitude)
    MAX_DIST = 5000 #maximum distance in miles (change to smaller number)
    near_list = []
    users_data = db.child('users').get()
    for user in users_data.each():
        udata = user.val()
        for k in udata.keys():
            location = (udata[k].get('location').get('latitude'), udata[k].get('location').get('longitude'))
            dist = geodesic(center,location).miles
            if(dist<MAX_DIST):
                udata[k]['distance_from_center'] = dist 
                near_list.append(udata[k])
    print(near_list)
    return json.dumps(near_list)

#function to save image properties to database
@app.route("/save_image", methods=["GET", "POST"])
def save_image_props_to_database():
    print("got")
    #
    data = request.get_json(force=True)
    user = data.get('user')
    url = data.get('url')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    classification = classify_image(url)[0].get('name')
    loc = get_image_location(url)
    new_datum = {"user": user, "url": url, "location": {
        "latitude": latitude, "longitude": longitude}, "classification": classification}
    if(loc!=None):
        new_datum['location'] = loc
    print(new_datum)

    return "saved"
    # users = db.child('users').get()

# print(get_url("images/test.jpg"))
# upload_image("images/testpep.jpg")
# print(get_url("images/testpep.jpg"))