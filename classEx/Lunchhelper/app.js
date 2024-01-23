console.log("connected");
var restaurantsList = document.getElementById("resturants-lists");

var goodRestaurants = ['Pasta Factory','JBirds','Five Guys']

goodRestaurants.forEach(function(restaurantName){
    // create a child element
    var listItem = document.createElement("li");
    // add classname
    listItem.classList.add("list-item");
    // set the inner html to the resturaunt name
    listItem.innerHTML = restaurantName;
    // append the child element tos the parent (ul)
    restaurantsList.appendChild(listItem);
})


var addButton = document.getElementById("add-button");
function addMyOwnRestaurant(){
    console.log("add button clicked")
    var inputName = document.getElementById("input-name");
    // create a child element
    var listItem = document.createElement("li");
    // add classname
    listItem.classList.add("list-item");
    // set the inner html to the resturaunt name
    listItem.innerHTML = inputName.value;
    // append the child element tos the parent (ul)
    restaurantsList.appendChild(listItem);
}
addButton.onclick = addMyOwnRestaurant;

var pickButton = document.getElementById("pick-button");
function randomSelection(){
    //get the list of list-items
    var allRestaurants = document.getElementsByClassName("list-item");
    console.log(allRestaurants);
    //get a random index
    var randIndex = Math.random();
    console.log("Randindex", randIndex)
    //get the innerHTML of the chosen one
    //create a new element
    //set the new elements innerHRML of the randomly selectedone
    //append the new element to body
    //
}
pickButton.onclick = randomSelection;