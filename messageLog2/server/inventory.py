import sqlite3

# Could use the rows function instead but she wants this
def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return result_dict

class InventoryDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getInventory(self):
        self.cursor.execute("SELECT * FROM inventory")
        inventory = self.cursor.fetchall()
        return inventory
    
    def getItem(self, item_id):
        self.cursor.execute("SELECT * FROM inventory WHERE id = ?", (item_id,))
        item = self.cursor.fetchone()
        return item

    def createItem(self, name, quantity, price):
        self.cursor.execute("INSERT INTO inventory (name, quantity, price) VALUES (?,?,?)",(name, quantity, price))
        self.connection.commit()

    def close(self):
        self.connection.close()
