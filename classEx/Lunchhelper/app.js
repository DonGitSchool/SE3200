console.log("connected");
var restaurantsList = document.getElementById("resturants-lists");

function addListItem(restaurantName){
    // create a child element
    var listItem = document.createElement("li");
    // add classname
    listItem.classList.add("list-item");
    // set the inner html to the resturaunt name
    listItem.innerHTML = restaurantName;
    // append the child element tos the parent (ul)
    restaurantsList.appendChild(listItem);
}

var goodRestaurants = ['Pasta Factory','JBirds','Five Guys']
fetch("https://api.jsonbin.io/v3/b/65b28e791f5677401f2537d2")
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data)
            var fetechedData = data.record;
            fetechedData.forEach(addListItem)
        })
    });

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
    addListItem(inputName.value)
}
addButton.onclick = addMyOwnRestaurant;


var pickButton = document.getElementById("pick-button");
function randomSelection(){
    //get the list of list-items
    var allRestaurants = document.getElementsByClassName("list-item");
    console.log(allRestaurants);
    //get a random index
    var randIndex = Math.floor(Math.random()*allRestaurants.length);
    console.log("Randindex", randIndex);
    //get the innerHTML of the chosen one
    var chosenOne = allRestaurants[randIndex].innerHTML
    console.log(chosenOne);
    //create a new element
    var selected = document.createAttribute("h3");
    //set the new elements innerHRML of the randomly selectedone
    selected.innerHTML = chosenOne;

    //append the new element to body
    selected.body.appendChild(selected);
}
pickButton.onclick = randomSelection;