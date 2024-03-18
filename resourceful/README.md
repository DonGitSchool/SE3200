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

REST Endpoints
The API server implements the following REST endpoints:

Get All Items
  Method: GET
  Path: /items
Get Single Item
  Method: GET
  Path: /items/<int:item_id>
Create Item
  Method: POST
  Path: /items
Delete Item
  Method: DELETE
  Path: /items/<int:item_id>
Update Item
  Method: PUT
  Path: /items/<int:item_id>
