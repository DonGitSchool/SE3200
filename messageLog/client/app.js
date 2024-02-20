console.log("connected");
var menuToggle = document.getElementById('menu-toggle');
var sideNav = document.getElementById('side-nav');
var mainContent = document.getElementById('main-content');

sideNav.classList.add('collapsed');
mainContent.classList.add('expanded');

menuToggle.onclick = function() {
    sideNav.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
};

function generateInventoryElement(item, index){
    var inventoryWrapper = document.querySelector("#inventory-section");
    var inventoryElement = document.createElement("p");
    inventoryElement.innerHTML = "Name: " + item.name + ", Number: " + item.number;
    inventoryElement.id = "item-" + index; // Add an id to the element
    inventoryWrapper.appendChild(inventoryElement);
    var horozontalRow = document.createElement ("hr");
    inventoryWrapper.appendChild(horozontalRow);
}

function loadInventoryFromServer(){
    fetch("http://localhost:8080/items")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var items = data;
            items.forEach((item, index) => generateInventoryElement(item, index));
        });
}

function createNewItemOnServer(){
    var inputItem = document.getElementById("input-item");
    var inputNumber = document.getElementById("input-number");
    var data = "name=" + encodeURIComponent(inputItem.value) + "&number=" + encodeURIComponent(inputNumber.value);
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