from flask import Flask, request, jsonify
from inventory import Inventory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
inventory = Inventory("inventory.db")
print(inventory.readAllItems())

@app.route("/items", methods=["GET"])
def retrieve_items_collection():
    items = inventory.readAllItems()
    return jsonify(items), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/items", methods=["POST"])
def create_in_items_collection():
    print("The request data is: ", request.form)
    item = {"name": request.form["name"], "number": request.form["number"]}
    inventory.saveItem(item)
    return "created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/items", methods=["DELETE"])
def remove_from_items_collection():
    item_name = request.args.get('name')
    print("The request data is: ", item_name)
    inventory.removeItem(item_name)
    return "removed", 201, {"Access-Control-Allow-Origin":"*"}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "URL does not exist", 404

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()