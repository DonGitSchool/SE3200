# Inventory System

This is an inventory system Donavan will use that allows you to manage items. Each item has the following attributes:

- `name`: The name of the item.
- `brand`: The brand of the item.
- `invid`: The inventory ID of the item.
- `color`: The color of the item.
- `type`: The type of the item.
- `quantity`: The quantity of the item.

## Database Schema

The SQLite database schema for the inventory system is as follows:

```sql
CREATE TABLE items (
    itemid INTEGER PRIMARY KEY, 
    name TEXT, 
    brand TEXT, 	
    invid TEXT, 
    color TEXT, 
    type TEXT, 
    quantity INTEGER
);

``` **REST Endpoints:** | Endpoint | Method | Path | | --- | --- | --- | | Get All Items | GET | /items | | Get Single Item | GET | /items/<int:item_id> | | Create Item | POST | /items | | Delete Item | DELETE | /items/<int:item_id> | | Update Item | PUT | /items/<int:item_id> |
