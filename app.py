from flask import Flask, render_template, request, jsonify
import json
import yagmail
from dotenv import load_dotenv
import os 

app = Flask(__name__)



@app.route("/")
def hello_world(): 
    return render_template("index.html")

def get_credentials(): 
    load_dotenv()

    sender_email = os.environ.get('SENDER_EMAIL')
    receiver_email = os.environ.get('RECEIVER_EMAIL')
    app_password = os.environ.get('APP_PASSWORD')

    return {"sender_email": sender_email, "receiver_email": receiver_email, "app_password": app_password}


@app.route("/send_email/", methods=["POST", "GET"])
def send_email():
    email = request.get_json()
    print("Email: ", email)
    credentials = get_credentials()
    print("creds: ", credentials)

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

