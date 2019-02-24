from flask import Flask, request
import pyrebase
# from clarifai.rest import ClarifaiApp
import requests
import json
from requests.auth import HTTPBasicAuth
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# classifier = ClarifaiApp(api_key='53785869e72f4901a7f93891241cdc10')
# model = classifier.public_models.general_model


config = {
    "apiKey": "AIzaSyAviP5BdXqcBr409cY78pu0goV60t_uofY",
    "authDomain": "developer-week-2019.firebaseapp.com",
    "databaseURL": "https://developer-week-2019.firebaseio.com",
    "storageBucket": "developer-week-2019.appspot.com",
    "serviceAccount": "./auth/developer-week-2019-firebase-adminsdk-oclw1-32519cf1de.json"
}

firebase = pyrebase.initialize_app(config)

# auth = firebase.auth()
# user = auth.sign_in_with_email_and_password("khazanahamericas@gmail.com", "kai-2019")

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
    # data = '{\n     "inputs": [\n {\n   "data": { \n"image": {\n  "url":' +'https://en.wikipedia.org/wiki/Food#/media/File:Good_Food_Display_-_NCI_Visuals_Online.jpg'+'           }\n }\n   ]}'
    # data = {
    #     "inputs":[
    #         {"data":}
    #     ]
    # }
    headers = {'Authorization': 'Key 53785869e72f4901a7f93891241cdc10',
               'Content-type': 'application/json'}
    res = requests.post(url="https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
                        headers=headers, data=data)
    # res = requests.post(url="https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
    #     data=data,
    #       headers= headers)
    # string = res.read().decode('utf-8')
    txt = res.json()
    # print(txt.get('outputs'))
    # print(type(txt))
    raw_data = txt.get('outputs')[0].get('data').get('concepts')
    # print(response)
    # return url
    return raw_data

# url = get_url("images/test.jpg")
# print(url)


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
    print(user, url, latitude, longitude)
    print(classification)
    new_datum = {"user": user, "url": url, "location": {
        "latitude": latitude, "longitude": longitude}, "classification": classification}
    db.child("users").child(user).push(new_datum)

    # check if its been added
    users = db.child('users').get()
    print(users.val())

    return "saved"
    #
    # users = db.child('users').get()
    # print(users.val())
    # db.child("users").push()
    # new_datum = {"user":user,"url": url, "location": {"latitude":latitude,"longitude":longitude}}
    # db.child("users").child(user).push(new_datum)

# save_image_props_to_database("test", url, 10,10)
# json_obj = json.loads(res.text)
# print(json_obj.get('data'))
# classify_image(get_url("images/test.jpg"))

# print(get_url("images/test.jpg"))
# upload_image("images/test.jpg")
