console.log("connected");
var gamesList = document.getElementById("games-lists");
var jsonBinApiKey = '$2a$10$u6RhvMf3zrjMVNf6ctR5.OGpmX6ozSQN3cOPTUhpJpnnfk8gn6j9e';
function addListItem(gameName){                                     
    var listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.innerHTML = gameName;
    gamesList.appendChild(listItem);
}
fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f") //Fetches the JSON bin that i have
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        var fetechedData = data.record;
        fetechedData.forEach(addListItem)
    });

var goodgames = []; //empty boi so that i can put stuff in it
goodgames.forEach(function(gameName){
    addListItem(gameName);
})
var addButton = document.getElementById("add-button"); //Got from class, adds the game when i press a button
function addMyOwngame(){
    console.log("add button clicked")
    var inputName = document.getElementById("input-name");
    addListItem(inputName.value)

    // Fetch the current bin
    fetch('https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f/latest', {
        headers: {
            'X-Master-Key': jsonBinApiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // Add the new game to the fetched data
        data.record.push(inputName.value);

        // Update the bin with the modified data
        fetch('https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': jsonBinApiKey
            },
            body: JSON.stringify(data.record)
        })
        .then(response => response.json())
        .then(data => console.log(data));
    });
}
addButton.onclick = addMyOwngame;
// Add event listener for 'Enter' key
var inputName = document.getElementById("input-name");
inputName.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addMyOwngame();
    }
});
var pickButton = document.getElementById("pick-button"); //Got from class, randomizes what game is chosen
function randomSelection(){
    var allgames = document.getElementsByClassName("list-item");
    console.log(allgames);
    var randIndex = Math.floor(Math.random()*allgames.length);
    console.log("Randindex", randIndex);
    var chosenOne = allgames[randIndex].innerHTML
    console.log(chosenOne);
    var selected = document.createElement("h3");
    selected.innerHTML = chosenOne;
    document.body.appendChild(selected);
}
pickButton.onclick = randomSelection;
var removeButton = document.getElementById("remove-button"); //Removes games that I dont need or want
function removeGame() {
    console.log("remove button clicked");
    var inputName = document.getElementById("input-name");
    var allgames = document.getElementsByClassName("list-item");
    for (var i = 0; i < allgames.length; i++) {
        if (allgames[i].innerHTML === inputName.value) {
            allgames[i].remove();
            break;
        }
    }
    // Fetch the current bin
    fetch('https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f/latest', {
        headers: {
            'X-Master-Key': jsonBinApiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remove the game from the fetched data
        var index = data.record.indexOf(inputName.value);
        if (index !== -1) {
            data.record.splice(index, 1);
        }
        // Update the bin with the modified data
        fetch('https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': jsonBinApiKey
            },
            body: JSON.stringify(data.record)
        })
        .then(response => response.json())
        .then(data => console.log(data));
    });
}

removeButton.onclick = removeGame;