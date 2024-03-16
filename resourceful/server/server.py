from flask import Flask, request, jsonify
from inventory import InventoryDB

#from flask import Flask, request, jsonify);
app = Flask(__name__)
db = InventoryDB("inventory.db")

@app.route("/items", methods=["GET"])
def retrieve_items_collection():
    db = InventoryDB("inventory.db")
    #load from db
    items = db.getInventory()
    return jsonify(items), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/items/<int:item_id>", methods=["GET"])
def retrieve_item_member(item_id):
    db = InventoryDB("inventory.db")
    #load from db
    item = db.getItem(item_id)
    if item:
        return jsonify(item), 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Item Not Found", 404, {"Access-Control-Allow-Origin": "*"}

@app.route("/items", methods=["POST"])
def create_in_items_collection():
    db = InventoryDB("inventory.db")
    item_name = request.form["name"]
    item_brand = request.form["brand"]
    item_invid = request.form["invId"]
    item_type = request.form["type"]
    item_color = request.form["color"]
    item_quantity = request.form["quantity"]
    db.createItem(item_name, item_brand, item_invid, item_color, item_type, item_quantity)
    return "created", 201, {"Access-Control-Allow-Origin": "*"}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "URL does not exist", 404

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()