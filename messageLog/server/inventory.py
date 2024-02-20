import json
import os.path

class Inventory:
    def __init__(self, filename):
        self.filename = filename
        if not os.path.isfile(filename):
            with open(self.filename, 'w') as f:
                json.dump([], f)

    def saveItem(self, item):
        all = self.readAllItems()
        all.append(item)
        with open(self.filename, 'w') as f:
            json.dump(all, f)

    def readAllItems(self):
        with open(self.filename, 'r') as f:
            return json.load(f)
        
    def removeItem(self, item_name):
        all = self.readAllItems()
        all = [item for item in all if item['name'] != item_name]
        with open(self.filename, 'w') as f:
            json.dump(all, f)