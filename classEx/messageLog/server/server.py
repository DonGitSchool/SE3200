from flask import Flask, request, jsonify
from dummydb import DummyDB

app = Flask(__name__)
db = DummyDB("dummydb.db")
print(db.readAllRecords())

@app.route("/rollercoasters", methods=["GET"])
def retreive_coasters_collection():
    #load from db
    rollercoasters= db.readAllRecords()
    return jsonify(rollercoasters), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_in_coasters_collection():
    print("The request data is: ", request.form)
    db.saveRecord(request.form["name"])
    return "created",201, {"Access-Control-Allow-Origin":"*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()