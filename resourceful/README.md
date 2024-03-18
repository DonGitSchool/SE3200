# Inventory System

This is an inventory system Donavan will use that allows you to manage items. Each item has the following attributes:

## Resource

### Items
Attributes:
- `name` (String): The name of the item.
- `brand` (String): The brand of the item.
- `invid` (String): The inventory ID of the item.
- `color` (String): The color of the item.
- `type` (String): The type of the item.
- `quantity` (INT): The quantity of the item.

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
```
## Rest Endpoints
| Endpoint | Method | Path |
| --- | --- | --- |
| Get All Items | GET | /items |
| Get Single Item | GET | /items/<int:item_id> |
| Create Item | POST | /items |
| Delete Item | DELETE | /items/<int:item_id> |
| Update Item | PUT | /items/<int:item_id> |
