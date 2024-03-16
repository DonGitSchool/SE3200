import sqlite3
#CHECKED
# Could use the rows function instead but she wants this
def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return result_dict
#CREATE TABLE items (itemid INTEGER PRIMARY KEY, name TEXT, brand TEXT, invid TEXT, color TEXT, type TEXT, quantity INTEGER);
class InventoryDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getInventory(self):
        self.cursor.execute("SELECT * FROM items")
        inventory = self.cursor.fetchall()
        return inventory
    
    def getItem(self, item_id):
        self.cursor.execute("SELECT * FROM items WHERE id = ?", (item_id))
        item = self.cursor.fetchone()
        return item

    def createItem(self, name, brand, invId, color, type, quantity):
        self.cursor.execute("INSERT INTO items(name, brand, invid, color, type, quantity) VALUES (?,?,?,?,?)",(name, brand, invId, color, type, quantity))
        self.connection.commit()

    def close(self):
        self.connection.close()
