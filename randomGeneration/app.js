console.log("connected");
//For myself:   JSONBIN API: https://jsonbin.io/api-reference/bins/get-started, Arrow Func: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//add my game list and my JsonBinApiKey
var gamesList = document.getElementById("games-lists");
var jsonBinApiKey =
  "$2a$10$u6RhvMf3zrjMVNf6ctR5.OGpmX6ozSQN3cOPTUhpJpnnfk8gn6j9e";

//got from clas, adds item and appends it to the page
function addListItem(gameName) {
  var listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.innerHTML = gameName;
  gamesList.appendChild(listItem);
}

fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f") //From class Fetches the JSON bin that i have
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var fetechedData = data.record;
    fetechedData.forEach(addListItem);
  });

var goodgames = []; //empty boi so that i can put stuff in it
goodgames.forEach(function (gameName) {
  addListItem(gameName);
});


function showBannerMessage(message) {
  //makes a banner to show the message given
  var banner = document.getElementById("banner-message");
  if (!banner) { //if there is not a banner it will make the banner
    banner = document.createElement("div");
    banner.id = "banner-message";
    document.body.appendChild(banner);
  }
  //banner styyling
  banner.style.position = "fixed";
  banner.style.width = "100%";
  banner.style.backgroundColor = "#f0f0f0";
  banner.style.color = "black";
  banner.style.textAlign = "center";
  banner.style.padding = "10px";
  banner.style.top = "0";
  banner.innerHTML = message;
}

function removeBannerMessage() {
  //so that it doesnt stay if they input something correct
  var banner = document.getElementById("banner-message");
  if (banner) {
    document.body.removeChild(banner);
  }
}

var addButton = document.getElementById("add-button"); //Got from class, adds the game when i press a button
function addMyOwngame() {
  var inputName = document.getElementById("input-name");

  //Check if the input field is not empty
  if (inputName.value.trim() !== "") {
    //fetches the current bin
    fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f/latest", { //https://rapidapi.com/guides/request-headers-fetch
      headers: {
        "X-Master-Key": jsonBinApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //Checks if the game is already in the list
        if (data.record.includes(inputName.value)) {
          showBannerMessage("Game is already in the list.");
        } else {
          //Adds the new game to the fetched data if it isnt
          data.record.push(inputName.value);

          //Updates the bin with the modified data  https://jsonbin.io/api-reference/bins/update
          fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": jsonBinApiKey,
            },
            body: JSON.stringify(data.record),
          })
            .then((response) => response.json())
            .then((data) => {
              showBannerMessage("Data: " + JSON.stringify(data));
              addListItem(inputName.value);
              removeBannerMessage();
            });
        }
      });
  } else {
    showBannerMessage("Input field is empty. Please enter a game name.");
  }
}
addButton.onclick = addMyOwngame;

var pickButton = document.getElementById("pick-button"); //Got from class, randomizes what game is chosen
function randomSelection() {
  var allgames = document.getElementsByClassName("list-item");
  console.log(allgames);
  var randIndex = Math.floor(Math.random() * allgames.length);
  console.log("Randindex", randIndex);
  var chosenOne = allgames[randIndex].innerHTML;
  console.log(chosenOne);

  // Check if a result box already exists
  var resultBox = document.getElementById("result-box");
  if (resultBox) {
    // If it exists, update the text
    resultBox.innerHTML = chosenOne;
  } else {
    // If it doesn't exist, create it
    resultBox = document.createElement("div");
    resultBox.id = "result-box";
    resultBox.innerHTML = chosenOne;
    document.body.appendChild(resultBox);
  }
  //styling of result box since it cant see the styleing css
  resultBox.style.border = "2px solid black";
  resultBox.style.padding = "10px";
  resultBox.style.marginTop = "10px";
  resultBox.style.backgroundColor = "";
  resultBox.style.textAlign = "center";
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
  fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f/latest", {
    headers: {
      "X-Master-Key": jsonBinApiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //removes the game from the fetched data
      var index = data.record.indexOf(inputName.value);
      if (index !== -1) {
        data.record.splice(index, 1);
      }
      // Update the bin with the modified data https://jsonbin.io/api-reference/bins/update
      fetch("https://api.jsonbin.io/v3/b/65b55d57266cfc3fde82055f", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": jsonBinApiKey,
        },
        body: JSON.stringify(data.record),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
}
removeButton.onclick = removeGame;

// Add event listener for 'Enter' key
var inputName = document.getElementById("input-name");
inputName.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addMyOwngame();
  }
});
