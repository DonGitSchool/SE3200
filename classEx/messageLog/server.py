from flask import Flask

app = Flask(__name__)

ROLLERCOASTERS = [
    
]

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()