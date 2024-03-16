console.log("connected");
//CREATE TABLE items (itemid INTEGER PRIMARY KEY, name TEXT, brand TEXT, invid TEXT, color TEXT, type TEXT, quantity INTEGER);
var menuToggle = document.getElementById('menu-toggle');
var sideNav = document.getElementById('side-nav');
var mainContent = document.getElementById('main-content');

sideNav.classList.add('collapsed');
mainContent.classList.add('expanded');

menuToggle.onclick = function() {
    sideNav.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
};

var inventoryWrapper = document.querySelector("#inventory-section");
function generateInventoryElement(itemData) {
    var itemName = document.createElement("h3");
    itemName.innerHTML = "Name: " + itemData.name;

    var itemBrand = document.createElement("p");
    itemBrand.innerHTML = "Brand: " + itemData.brand;

    var itemInvId = document.createElement("p");
    itemInvId.innerHTML = "Inventory ID: " + itemData.invid;

    var itemColor = document.createElement("p");
    itemColor.innerHTML = "Color: " + itemData.color;

    var itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = "Quantity: " + itemData.quantity;

    var itemType = document.createElement("p");
    itemType.innerHTML = "Type: " + itemData.itemType; // Add itemType property

    inventoryWrapper.appendChild(itemName);
    inventoryWrapper.appendChild(itemBrand);
    inventoryWrapper.appendChild(itemInvId);
    inventoryWrapper.appendChild(itemColor);
    inventoryWrapper.appendChild(itemQuantity);
    inventoryWrapper.appendChild(itemType); // Append itemType element

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
        console.log("Edit the inventory item with id: ", itemData.id);
        editInventoryItemFromServer(itemData.id);
    };
    inventoryWrapper.appendChild(editButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        console.log("Delete the inventory item with id: ", itemData.id);
        deleteInventoryItemFromServer(itemData.id);
    };
    inventoryWrapper.appendChild(deleteButton);

    var horizontalRow = document.createElement("hr");
    inventoryWrapper.appendChild(horizontalRow);
}
function editInventoryItemFromServer(item_id){
    console.log("Editing inventory item with id: ", item_id);
}

function deleteInventoryItemFromServer(item_id){
    console.log("Deleting inventory item with id: ", item_id);
}

function loadInventoryFromServer(){
    fetch("http://localhost:8080/items")
        .then(function(response){
            response.json()
            .then(function(data){
                console.log(data);
                var items = data;
                items.forEach(generateInventoryElement);
            })
        })
}
function createNewItemOnServer(){
    //name, brand, invid, color, quantity
    var inputItemName = document.getElementById("input-item-name");
    var inputItemBrand = document.getElementById("input-item-brand");
    var inputItemInvId = document.getElementById("input-item-invId");
    var inputItemColor = document.getElementById("input-item-color");
    var inputItemType = document.getElementById("input-item-type");
    var inputItemQuantity = document.getElementById("input-item-quantity");

    var data = "name=" + encodeURIComponent(inputItemName.value);
    data += "&brand=" + encodeURIComponent(inputItemBrand.value);
    data += "&invId=" + encodeURIComponent(inputItemInvId.value);
    data += "&color=" + encodeURIComponent(inputItemColor.value);
    data += "&quantity=" + encodeURIComponent(inputItemQuantity.value);
    data += "&itemType=" + encodeURIComponent(inputItemType.value);
    console.log("data to be sent to server", data);

    fetch("http://localhost:8080/items",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("New Item Created", response);
        var inventoryWrapper = document.querySelector("#inventory-section");
        inventoryWrapper.innerHTML = "";
        loadInventoryFromServer();
    });
}
var addItemButton = document.getElementById("add-item-button");
addItemButton.onclick = createNewItemOnServer;

var menuAdd = document.getElementById('menu-add');
var menuRemove = document.getElementById('menu-remove');

var addItemButton = document.getElementById('add-item-button');

menuAdd.onclick = function() {
    addItemButton.textContent = 'Add Item';
    addItemButton.onclick = createNewItemOnServer;
};

function removeItemFromInv(){
    var inputItem = document.getElementById("input-item");
    var itemName = encodeURIComponent(inputItem.value);
    console.log("Item to be deleted:", itemName);

    fetch("http://localhost:8080/items?name=" + itemName, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("Item Deleted", response);
        var inventoryWrapper = document.querySelector("#inventory-section");
        inventoryWrapper.innerHTML = "";
        loadInventoryFromServer();
    });
}

menuRemove.onclick = function() {
    addItemButton.textContent = 'Remove Item';
    addItemButton.onclick = removeItemFromInv;
};
loadInventoryFromServer();