import sqlite3

#connect to the DB file
connection = sqlite3.connect("rollercoasters.db")


#use the connecction instance to perform DB operations
#create a cursor instance for our connection
cursor = connection.cursor()

#ANYTIME BEFORE FETCH

cursor.execute("SELECT * FROM rollercoasters")

#fetchall - always returns an array of tuples, but could be empty
rollercoasters = cursor.fetchall()
print("before adding",rollercoasters)

cursor.execute("SELECT * FROM rollercoasters")
#fetchone - always returns the first tuple or None
rollercoasters = cursor.fetchone()
print("rollercoasters",rollercoasters)

#add new rollercoaster review
cursor.execute("INSERT INTO rollercoasters (name,review,rating) VALUES ('X2','I was not expecing that',10)")


cursor.execute("SELECT * FROM rollercoasters")
#fetchall - always returns an array of tuples, but could be empty
rollercoasters = cursor.fetchall()
print("after adding",rollercoasters)

#close connection
connection.close()