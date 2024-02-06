from flask import Flask

app = Flask(__name__)

ROLLERCOASTERS = "Test"

@app.route("/rollercoasters")
def retreive_coasters_collection():
    return ROLLERCOASTERS

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()