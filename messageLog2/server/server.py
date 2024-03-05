from flask import Flask, request, jsonify
from inventory import InventoryDB

#CREATE TABLE items (itemid INTEGER PRIMARY KEY, name TEXT, brand TEXT, quantity INTEGER, invid TEXT, color TEXT);
app = Flask(__name__)
db = InventoryDB("inventory.db")

@app.route("/items", methods=["GET"])
def retrieve_items_collection():
    db = InventoryDB("inventory.db")
    #load from db
    items = db.getInventory()
    return jsonify(items), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/items", methods=["POST"])
def create_in_items_collection():
    db = InventoryDB("inventory.db")
    item_name = request.form["name"]
    item_brand = request.form["brand"]
    item_invid = request.form["invid"]
    item_color = request.form["color"]
    item_quantity = request.form["quantity"]
    db.createItem(item_name, item_brand, item_invid, item_color, item_quantity)
    return "created", 201, {"Access-Control-Allow-Origin": "*"}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "URL does not exist", 404

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()