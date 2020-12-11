from flask import Flask, request, jsonify
import requests
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

import os

app = Flask(__name__)

@app.route("/transfer", methods=['POST'])
def transfer():

    apikey = request.headers["X-Api-Key"]
    data = request.get_json()
    custID = data["custID"]
    payeeID = data["payeeID"]
    amount = data["amount"]
    dateTime = data["dateTime"]
    expensesCat = data["expensesCat"]
    eGift = data["eGift"]
    message = data["message"]

    headers = {'x-api-key': apikey}
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

if __name__ == '__main__':
    app.run(port=5001, debug=True)

# {
#     "customerName": "Fong King Shing",
#     "customerAge": 55,
#     "serviceOfficerName": "Chew AJ",
#     "NRIC": "S9510283B",
#     "registrationTime": "26/12/2020 11:55:44",
#     "branchCode": "005",
#     "image": "download.jpg",
#     "productType": "137,070"
# }