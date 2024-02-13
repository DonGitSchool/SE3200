from flask import Flask, request

app = Flask(__name__)

ROLLERCOASTERS = ["Test",
                  "Test2"
                  ]

@app.route("/rollercoasters", methods=["GET"])
def retreive_coasters_collection():
    return ROLLERCOASTERS,200, {"Access-Control-Allow-Origin":"*"}

@app.route("/rollercoasters", methods=["POST"])
def create_in_coasters_collection():
    print("The request data is: ", request.form)
    ROLLERCOASTERS.append(request.form["name"])
    return "created",201, {"Access-Control-Allow-Origin":"*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()