console.log("connected");
//Broke March
var coasterReviewsWrapper = document.querySelector("#reviews-section");
function generateReviewElements(coasterData){
    //Creating individual stuff (Will break the code for now)
    var coasterName = document.createElement("h3");
    coasterName.innerHTML = coasterData.name;

    var coasterReview = document.createElement("p");
    coasterReview.innerHTML = coasterData.review;

    var coasterRating = document.createElement("p");
    coasterRating.innerHTML = coasterData.rating;

    coasterReviewsWrapper.appendChild(coasterName);
    coasterReviewsWrapper.appendChild(coasterReview);
    coasterReviewsWrapper.appendChild(coasterRating);

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit"
    editButton.onclick = function(){
        // This will need the rollercoasters ID to edit the item
        console.log("Edit the id: ", coasterData.id);
        editRollercoasterFromServer(coasterData.id);
    }
    coasterReviewsWrapper.appendChild(editButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete"
    deleteButton.onclick = function(){
        // This will need the rollercoasters ID to edit the item
        console.log("Delete the id: ", coasterData.id);
        editRollercoasterFromServer(coasterData.id);
    }

    //add the buttons
    coasterReviewsWrapper.appendChild(editButton);
    coasterReviewsWrapper.appendChild(deleteButton);
    var horozontalRow = document.createElement ("hr");
    coasterReviewsWrapper.appendChild(horozontalRow);
}

function editRollercoasterFromServer(coaster_id){
    console.log("Editing rollercoaster with id: ", coaster_id);
}
function deleteRollercoasterFromServer(coaster_id){
    console.log("Deleting rollercoaster with id: ", coaster_id);
}

function loadReviewsFromServer(){
    fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
            response.json()
            .then(function(data){
                console.log(data);
                var rollercoasters = data;
                rollercoasters.forEach(generateReviewElements)
            })
        })
    }

function createNewReviewOnServer(){
    var inputcoasterName = document.getElementById("input-coaster-name");
    var inputcoasterReview = document.getElementById("input-coaster-review");
    var inputcoasterRating = document.getElementById("input-coaster-rating");
    var data = "name=" + encodeURIComponent(inputcoasterName.value);
    data += "&review=" + encodeURIComponent(inputcoasterReview.value);
    data += "&rating=" + encodeURIComponent(inputcoasterRating.value);
    console.log("data to be sent to server", data);

    fetch("http://localhost:8080/rollercoasters",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("New Review Created", response);
        var coasterReviewsWrapper = document.querySelector("#reviews-section");
        coasterReviewsWrapper.innerHTML = "";
        loadReviewsFromServer();
    });
}

var addReviewButton = document.getElementById("add-review-button");
addReviewButton.onclick = createNewReviewOnServer;

loadReviewsFromServer();
