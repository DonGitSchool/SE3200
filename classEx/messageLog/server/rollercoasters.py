import sqlite3

#connect to the DB file
connection = sqlite3.connect("rollercoasters.db")

#use the connecction instance to perform DB operations
#create a cursor instance for our connection
cursor = connection.cursor()

#

#close connection
connection.close()