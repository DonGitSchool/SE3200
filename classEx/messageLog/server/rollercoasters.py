import sqlite3

class RolllerCoastersDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.cursor = self.connection.cursor()

    def getRollerCoasters(self):
        self.cursor.execute("SELECT * FROM rollercoasters")
        rollercoasters = self.cursor.fetchall()
        return rollercoasters

    def createRollerCoasters(self, name, review, rating):
        self.cursor.execute("INSERT INTO rollercoasters (name,review,rating) VALUES (?,?,?)",(name,review,rating))
        self.connection.commit()

    def close(self):
        self.connection.close()
        
######################################################
#connect to the DB file
#connection = sqlite3.connect("rollercoasters.db")

#use the connecction instance to perform DB operations
#create a cursor instance for our connection
#cursor = connection.cursor()

#ANYTIME BEFORE FETCH

#cursor.execute("SELECT * FROM rollercoasters")

#fetchall - always returns an array of tuples, but could be empty
#rollercoasters = cursor.fetchall()
#print("before adding",rollercoasters)

#cursor.execute("SELECT * FROM rollercoasters")
#fetchone - always returns the first tuple or None
#rollercoasters = cursor.fetchone()
#print("rollercoasters",rollercoasters)

#add new rollercoaster review
#cursor.execute("INSERT INTO rollercoasters (name,review,rating) VALUES ('X2','I was not expecing that',10)")

#commit the change
#connection.commit()

#cursor.execute("SELECT * FROM rollercoasters")
#fetchall - always returns an array of tuples, but could be empty
#rollercoasters = cursor.fetchall()
#print("after adding",rollercoasters)


#close connection
#connection.close()