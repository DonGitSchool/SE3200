import sqlite3

#connect to the DB file
connection = sqlite3.connect("inventory.db")

#use the connecction instance to perform DB operations


#close connection
connection.close()