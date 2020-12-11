from flask import Flask, request, jsonify
import requests
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import jwt
import os

app = Flask(__name__)

REFRESH_TOKEN_SECRET = "cfc12c648041d410ab4858841e87707ee901a1b2174f57dd410cd6549feb2f8f841c4e23a4a4cd9eac72a3fab38f53cb3e1ef694fb4d890e9433adf08486eaaa"

API_KEY = 'nIQY2CKXiN61xvsVkVx6P4uf4qRlPXO34XeLt1aE'

def authorise(token):
    try: 
        payload = jwt.decode(token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except Exception as e:
        print(e)
    else:
        auth_status = True

@app.route("/transfer", methods=['POST'])
def transfer():

    accessToken = request.headers["accessToken"]
    auth_status = False
    authorise(accessToken)

    if auth_status:

        data = request.get_json()
        custID = data["custID"]
        payeeID = data["payeeID"]
        amount = data["amount"]
        dateTime = data["dateTime"]
        expensesCat = data["expensesCat"]
        eGift = data["eGift"]
        message = data["message"]

        headers = {'x-api-key': API_KEY}
        data = {'custID': custID,'amount': amount}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/update", data=json_data, headers=headers)
        update_result = response.text
        print(update_result)

        data = {'custID': custID,
            'payeeID': payeeID,
            'amount': amount,
            'dateTime': dateTime,
            'expensesCat': expensesCat,
            'eGift': eGift,
            'message': message}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/add", data=json_data, headers=headers)
        transaction_result = response.text
        print(transaction_result)

        data = {'custID': custID}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view", data=json_data, headers=headers)
        result_json = json.loads(response.text)
        last_transaction = result_json[-1]
        curr_balance = last_transaction["amount"]
        print(curr_balance)
    
        return {"result": {
                    "result": transaction_result,
                    "balance": curr_balance
                    }
                }, 201
    
    else:
        return {"result": {
                    "result": "auth failed"
                    }
                }, 401

@app.route("/balance", methods=['POST'])
def view_balance():

    accessToken = request.headers["accessToken"]
    auth_status = False
    authorise(accessToken)

    if auth_status:

        headers = {'x-api-key': API_KEY}
        data = request.get_json()
        custID = data["custID"]
        data = {'custID': custID}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view", data=json_data, headers=headers)
        result_json = json.loads(response.text)
        last_transaction = result_json[-1]
        curr_balance = last_transaction["amount"]
        print(curr_balance)
    
        return {"result": {
                    "balance": curr_balance
                    }
                }, 201
    else:
        return {"result": {
                    "result": "auth failed"
                    }
                }, 401

@app.route("/transaction", methods=['POST'])
def view_transaction():

    accessToken = request.headers["accessToken"]
    auth_status = False
    authorise(accessToken)

    if auth_status:

        headers = {'x-api-key': API_KEY}
        data = request.get_json()
        custID = data["custID"]
        data = {'custID': custID}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view", data=json_data, headers=headers)
        result_json = json.loads(response.text)
        print(result_json)
    
        return {"result": {
                    "transaction": result_json
                    }
                }, 201
    else:
        return {"result": {
                    "result": "auth failed"
                    }
                }, 401

@app.route("/user", methods=['POST'])
def view_user():

    accessToken = request.headers["accessToken"]
    auth_status = False
    authorise(accessToken)

    if auth_status:

        accessToken = request.headers["accessToken"]
        authorise(refreshToken)

        headers = {'x-api-key': API_KEY}
        data = request.get_json()
        custID = data["custID"]
        data = {'custID': custID}
        json_data = json.dumps(data)
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view", data=json_data, headers=headers)
        result_json = json.loads(response.text)
        print(result_json)
    
        return {"result": {
                    "users": result_json
                    }
                }, 201
    else:
        return {"result": {
                    "result": "auth failed"
                    }
                }, 401

@app.route("/users", methods=['POST'])
def view_users():

    accessToken = request.headers["accessToken"]
    auth_status = False
    authorise(accessToken)

    if auth_status:

        headers = {'x-api-key': API_KEY}
        response = requests.post("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users", headers=headers)
        result_json = json.loads(response.text)
        print(result_json)
    
        return {"result": {
                    "users": result_json
                    }
                }, 201
    else:
        return {"result": {
                    "result": "auth failed"
                    }
                }, 401

if __name__ == '__main__':
    app.run(port=5001, debug=True)