console.log("connected");

var inventoryWrapper = document.querySelector("#inventory-section");

function generateInventoryElements(itemData){
    var itemName = document.createElement("h3");
    itemName.innerHTML = "Name: " + itemData.name;

    var itemBrand = document.createElement("p");
    itemBrand.innerHTML = "Brand: " + itemData.brand;

    var itemInvid = document.createElement("p");
    itemInvid.innerHTML = "InvID: " + itemData.invid;

    var itemColor = document.createElement("p");
    itemColor.innerHTML = "Color: " +  itemData.color;

    var itemType = document.createElement("p");
    itemType.innerHTML = "Type: " + itemData.type;

    var itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = "Quantity: " + itemData.quantity;

    inventoryWrapper.appendChild(itemName);
    inventoryWrapper.appendChild(itemBrand);
    inventoryWrapper.appendChild(itemInvid);
    inventoryWrapper.appendChild(itemColor);
    inventoryWrapper.appendChild(itemType);
    inventoryWrapper.appendChild(itemQuantity);

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit"
    editButton.onclick = function(){
        console.log("Edit the id: ", itemData.itemid);
        editItemFromServer(itemData.itemid);
    }
    inventoryWrapper.appendChild(editButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete"
    deleteButton.onclick = function(){
        console.log("Delete the id: ", itemData.itemid);
        deleteItemFromServer(itemData.itemid);
    }

    inventoryWrapper.appendChild(editButton);
    inventoryWrapper.appendChild(deleteButton);
    var horozontalRow = document.createElement ("hr");
    inventoryWrapper.appendChild(horozontalRow);
}

function editItemFromServer(item_id){
    var newName = prompt("Enter new name for the item:");
    var newBrand = prompt("Enter new brand for the item:");
    var newInvid = prompt("Enter new inventory ID for the item:");
    var newColor = prompt("Enter new color for the item:");
    var newType = prompt("Enter new type for the item:");
    var newQuantity = prompt("Enter new quantity for the item:");

    var data = "name=" + encodeURIComponent(newName);
    data += "&brand=" + encodeURIComponent(newBrand);
    data += "&invid=" + encodeURIComponent(newInvid);
    data += "&color=" + encodeURIComponent(newColor);
    data += "&type=" + encodeURIComponent(newType);
    data += "&quantity=" + encodeURIComponent(newQuantity);

    fetch("http://localhost:8080/items/" + item_id, {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("Item Updated", response);
        var inventoryWrapper = document.querySelector("#inventory-section");
        inventoryWrapper.innerHTML = "";
        loadInventoryFromServer();
    });
}

function deleteItemFromServer(item_id){
    var confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
        fetch("http://localhost:8080/items/" + item_id, {
            method: "DELETE"
        }).then(function(response){
            console.log("Item Deleted", response);
            var inventoryWrapper = document.querySelector("#inventory-section");
            inventoryWrapper.innerHTML = "";
            loadInventoryFromServer();
        });
    }
}

function loadInventoryFromServer(){
    fetch("http://localhost:8080/items")
        .then(function(response){
            response.json()
            .then(function(data){
                console.log(data);
                var items = data;
                items.forEach(generateInventoryElements)
            })
        })
    }

function createNewItemOnServer(){
    var inputItemName = document.getElementById("input-item-name");
    var inputItemBrand = document.getElementById("input-item-brand");
    var inputItemInvid = document.getElementById("input-item-invid");
    var inputItemColor = document.getElementById("input-item-color");
    var inputItemType = document.getElementById("input-item-type");
    var inputItemQuantity = document.getElementById("input-item-quantity");
        
    var data = "name=" + encodeURIComponent(inputItemName.value);
    data += "&brand=" + encodeURIComponent(inputItemBrand.value);
    data += "&invid=" + encodeURIComponent(inputItemInvid.value);
    data += "&color=" + encodeURIComponent(inputItemColor.value);
    data += "&type=" + encodeURIComponent(inputItemType.value);
    data += "&quantity=" + encodeURIComponent(inputItemQuantity.value);
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

loadInventoryFromServer();
