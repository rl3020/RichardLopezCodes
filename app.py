from flask import Flask, render_template, request, jsonify
import json
import yagmail
from dotenv import load_dotenv
import os 

app = Flask(__name__)

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/")
def hello_world(): 
    return render_template("index.html")

def get_credentials(): 
    load_dotenv()

    sender_email = os.environ.get('sender_email')
    receiver_email = os.environ.get('receiver_email')
    app_password = os.environ.get('app_password')

    return {"sender_email": sender_email, "receiver_email": receiver_email, "app_password": app_password}


@app.route("/send_email/", methods=["POST", "GET"])
def send_email():
    email = request.get_json()
    print("Email: ", email)
    credentials = get_credentials()

    sender_email = credentials['sender_email']
    receiver_email = credentials['receiver_email']  # Enter receiver address
    app_pass = credentials['app_password']

    subject = email['sender-name'] + ":" + email['sender-email']
    content = email['body']


    with yagmail.SMTP(sender_email, app_pass) as yag:
        yag.send(
            to=receiver_email, 
            subject=subject, 
            contents=content
            )
        print('Sent email successfully')
    
    result = "200"
    return jsonify(result)


if __name__ == "__main__": 
    app.run(port=5000)

