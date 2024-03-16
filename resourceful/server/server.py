from typing import Any, Callable
from flask import Flask, request,jsonify
from inventory import InventoryDB

class MyFlask(Flask):
    def add_url_rule(self, rule, endpoint=None, view_func=None, **options):
        super().add_url_rule(rule, endpoint, view_func, provide_automatic_options=False, **options)
        
app = MyFlask(__name__)
db = InventoryDB("inventory.db")

@app.route("/<path:path>", methods=["OPTIONS"])
def cors_preflight(path):
    response_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }
    return "", 204, response_headers

@app.route("/items", methods=["GET"])
def retrieve_items_collection():
    db = InventoryDB("inventory.db")
    items = db.getItems()
    return jsonify(items), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/items/<int:item_id>", methods=["GET"])
def retrieve_item_member(item_id):
    db = InventoryDB("inventory.db")
    item = db.getItem(item_id)
    if item:
        return item, 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Item Not Found", 404, {"Access-Control-Allow-Origin": "*"}

@app.route("/items", methods=["POST"])
def create_in_items_collection():
    db = InventoryDB("inventory.db")
    name = request.form["name"]
    brand = request.form["brand"]
    invid = request.form["invid"]
    color = request.form["color"]
    type = request.form["type"]
    quantity = request.form["quantity"]
    db.createItem(name, brand, invid, color, type, quantity)
    return "created",201, {"Access-Control-Allow-Origin":"*"}

@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item_member(item_id):
    db = InventoryDB("inventory.db")
    if db.getItem(item_id):
        deleted = db.deleteItem(item_id)
        if deleted:
            return "Item deleted", 200, {"Access-Control-Allow-Origin": "*"}
        else:
            return "Failed to delete item", 500, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Item Not Found", 404, {"Access-Control-Allow-Origin": "*"}

@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item_member(item_id):
    db = InventoryDB("inventory.db")
    name = request.form["name"]
    brand = request.form["brand"]
    invid = request.form["invid"]
    color = request.form["color"]
    type = request.form["type"]
    quantity = request.form["quantity"]
    updated = db.editItem(item_id, name, brand, invid, color, type, quantity)
    if updated:
        return "Item updated", 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Item Not Found", 404, {"Access-Control-Allow-Origin": "*"}
    
def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()
