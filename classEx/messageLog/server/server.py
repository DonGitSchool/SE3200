from typing import Any, Callable
from flask import Flask, request,jsonify
from rollercoasters import RolllerCoastersDB

#added mar 7 new stuff
#getting inheritence from flask so that we control pre flighr
class MyFlask(Flask):
    def add_url_rule(self, rule, endpoint=None, view_func=None, **options):
        super().add_url_rule(rule, endpoint, view_func, provide_automatic_options=False, **options)
        
        
app = MyFlask(__name__)
db = RolllerCoastersDB("rollercoasters.db")

@app.route("/<path:path>", methods=["OPTIONS"])
def cors_preflight(path):
    response_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }
    return "", 204, response_headers

@app.route("/rollercoasters", methods=["GET"])
def retreive_coasters_collection():
    db = RolllerCoastersDB("rollercoasters.db")
    #load from db
    rollercoasters= db.getRollerCoasters()
    return jsonify(rollercoasters), 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/rollercoasters/<int:coaster_id>", methods=["GET"])
def retreive_coaster_member(coaster_id):
    db = RolllerCoastersDB("rollercoasters.db")
    #load from db
    rollercoaster= db.getRollerCoaster(coaster_id)
    if rollercoaster:
        return rollercoaster, 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Rollercoaster Not Found", 404, {"Access-Control-Allow-Origin": "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_in_coasters_collection():
    db = RolllerCoastersDB("rollercoasters.db")
    print("The request data is: ", request.form)
    name = request.form["name"]
    review = request.form["review"]
    rating = request.form["rating"]
    db.createRollerCoaster(name,review,rating)
    return "created",201, {"Access-Control-Allow-Origin":"*"}


#added mar 7 new stuff
@app.route("/rollercoasters/<int:coaster_id>", methods=["DELETE"])
def delete_coaster_member(coaster_id):
    db = RolllerCoastersDB("rollercoasters.db")
    # check if coaster exists
    if db.getRollerCoaster(coaster_id):
        # delete from db
        deleted = db.deleteRollerCoaster(coaster_id)
        if deleted:
            return "Coaster deleted", 200, {"Access-Control-Allow-Origin": "*"}
        else:
            return "Failed to delete coaster", 500, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Coaster Not Found", 404, {"Access-Control-Allow-Origin": "*"}
    
@app.route("/rollercoasters/<int:coaster_id>", methods=["PUT"])
def update_coaster_member(coaster_id):
    db = RolllerCoastersDB("rollercoasters.db")
    # update in db
    name = request.form["name"]
    review = request.form["review"]
    rating = request.form["rating"]
    updated = db.updateRollerCoaster(coaster_id, name, review, rating)
    if updated:
        return "Coaster updated", 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Coaster Not Found", 404, {"Access-Control-Allow-Origin": "*"}
    
def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()