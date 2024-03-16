import sqlite3

def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return  result_dict

class InventoryDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getItems(self):
        self.cursor.execute("SELECT * FROM items")
        items = self.cursor.fetchall()
        return items
    
    def getItem(self, item_id):
        self.cursor.execute("SELECT * FROM items WHERE itemid = ?", (item_id,))
        item = self.cursor.fetchone()
        return item

    def createItem(self, name, brand, invid, color, type, quantity):
        self.cursor.execute("INSERT INTO items (name, brand, invid, color, type, quantity) VALUES (?,?,?,?,?,?)",(name, brand, invid, color, type, quantity))
        self.connection.commit()

    def deleteItem(self, item_id):
        self.cursor.execute("DELETE FROM items WHERE itemid = ?", (item_id,))
        self.connection.commit()

    def editItem(self, item_id, name, brand, invid, color, type, quantity):
        self.cursor.execute("UPDATE items SET name = ?, brand = ?, invid = ?, color = ?, type = ?, quantity = ? WHERE itemid = ?", (name, brand, invid, color, type, quantity, item_id))
        self.connection.commit()

    def close(self):
        self.connection.close()
