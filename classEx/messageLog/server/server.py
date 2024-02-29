from flask import Flask, request, jsonify
from rollercoasters import RolllerCoastersDB

app = Flask(__name__)
db = RolllerCoastersDB("rollercoasters.db")
print(db.getRollerCoasters())

@app.route("/rollercoasters", methods=["GET"])
def retreive_coasters_collection():
    db = RolllerCoastersDB("rollercoasters.db")
    #load from db
    rollercoasters= db.getRollerCoasters()
    return jsonify(rollercoasters), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_in_coasters_collection():
    db = RolllerCoastersDB("rollercoasters.db")
    print("The request data is: ", request.form)
    name = request.form["name"]
    review = request.form["review"]
    rating = request.form["rating"]
    db.createRollerCoasters(name,review,rating)
    return "created",201, {"Access-Control-Allow-Origin":"*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()