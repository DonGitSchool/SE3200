For Resourceful:

first install stuffs:
sudo apt update
sudo apt upgrade
sudo apt install python3-venv
python3 -m venv .venv
. .venv/bin/activate
pip install Flask

then make the database
CREATE TABLE items (itemid INTEGER PRIMARY KEY, name TEXT, brand TEXT, invid TEXT, color TEXT, type TEXT, quantity INTEGER);
