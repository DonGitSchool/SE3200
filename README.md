For Resourceful:

first install stuffs:
sudo apt update
sudo apt upgrade
sudo apt install python3-venv
sudo apt install sqlite
sudo apt install python3-pip

Get the github Repo then in the server part 
python3 -m venv .venv
. .venv/bin/activate
pip install Flask

then make the database
CREATE TABLE items (itemid INTEGER PRIMARY KEY, name TEXT, brand TEXT, invid TEXT, color TEXT, type TEXT, quantity INTEGER);


to make it run fine non local

in server.py
def run():
    app.run(host='IP_ADDRESS',port=8080)

in app.js
all fetch
  fetch("http://IP_ADDRESS:8080/items",{
