import sqlite3

#Could use the rows function instead but she wants this
def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return  result_dict
class RolllerCoastersDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getRollerCoasters(self):
        self.cursor.execute("SELECT * FROM rollercoasters")
        rollercoasters = self.cursor.fetchall()
        return rollercoasters
    
    def getRollerCoaster(self, coaster_id):
        data= []
        self.cursor.execute("SELECT * FROM rollercoasters WHERE id = ?", (coaster_id,))
        rollercoaster = self.cursor.fetchone()
        return rollercoaster

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