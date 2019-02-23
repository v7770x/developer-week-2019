from flask import Flask
import pyrebase
app = Flask(__name__)

config = {
	"apiKey": "AIzaSyAviP5BdXqcBr409cY78pu0goV60t_uofY",
    "authDomain": "developer-week-2019.firebaseapp.com",
    "databaseURL": "https://developer-week-2019.firebaseio.com",
    "storageBucket": "developer-week-2019.appspot.com",
    "serviceAccount":"./auth/developer-week-2019-firebase-adminsdk-oclw1-32519cf1de.json"
}

firebase = pyrebase.initialize_app(config)

# auth = firebase.auth()
# user = auth.sign_in_with_email_and_password("khazanahamericas@gmail.com", "kai-2019")

db=firebase.database()
storage = firebase.storage()


@app.route("/")
def hello():
    return "Food!"

def upload_image(local_pth):
    print(local_pth)
    storage.child(local_pth).put(local_pth)

def get_url(pth):
    url = storage.child(pth).get_url(None)
    return url

print(get_url("images/test.jpg"))
# upload_image("images/test.jpg")