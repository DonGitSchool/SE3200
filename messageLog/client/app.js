console.log("connected");
var menuToggle = document.getElementById('menu-toggle');
var sideNav = document.getElementById('side-nav');
var mainContent = document.getElementById('main-content');

menuToggle.onclick = function() {
    sideNav.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
};
function generateInventoryElement(item){
    var inventoryWrapper = document.querySelector("#inventory-section");
    var inventoryElement = document.createElement("p");
    inventoryElement.innerHTML = item;
    inventoryWrapper.appendChild(inventoryElement);
    var horozontalRow = document.createElement ("hr");
    inventoryWrapper.appendChild(horozontalRow);
}

function loadInventoryFromServer(){
    fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var items = data;
            items.forEach(generateInventoryElement);
        });
}

function createNewItemOnServer(){
    var inputItem = document.getElementById("input-item");
    var data = "name=" + encodeURIComponent(inputItem.value);
    console.log("data to be sent to server", data);

    fetch("http://localhost:8080/rollercoasters",{
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

menuRemove.onclick = function() {
    addItemButton.textContent = 'Remove Item';
    addItemButton.onclick = removeItemFromInv;
};
function removeItemFromInv(){
    var inputItem = document.getElementById("input-item");
    var data = "name=" + encodeURIComponent(inputItem.value);
    console.log("data to be sent to server", data);

    fetch("http://localhost:8080/rollercoasters",{
        method: "DELETE",
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


loadInventoryFromServer();