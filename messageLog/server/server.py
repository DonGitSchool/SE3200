from flask import Flask, request, jsonify
from inventory import Inventory

app = Flask(__name__)
inventory = Inventory("inventory.db")
print(inventory.readAllItems())

@app.route("/rollercoasters", methods=["GET"])
def retrieve_coasters_collection():
    rollercoasters = inventory.readAllItems()
    return jsonify(rollercoasters), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_in_coasters_collection():
    print("The request data is: ", request.form)
    inventory.saveItem(request.form["name"])
    return "created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/rollercoasters", methods=["DELETE"])
def remove_from_coasters_collection():
    print("The request data is: ", request.form)
    inventory.removeItem(request.form["name"])
    return "removed", 201, {"Access-Control-Allow-Origin":"*"}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "URL does not exist", 404

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()