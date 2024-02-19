console.log("connected");
//Working as of Feb18
function generateReviewElements(coasterName){
    var coasterReviewsWrapper = document.querySelector("#reviews-section");
    var coasterReview = document.createElement("h3");
    coasterReview.innerHTML = coasterName; // coasterName is a string now
    coasterReviewsWrapper.appendChild(coasterReview);
    var horozontalRow = document.createElement ("hr");
    coasterReviewsWrapper.appendChild(horozontalRow);
}

function loadReviewsFromServer(){
    fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var rollercoasters = data;
            rollercoasters.forEach(generateReviewElements);
        });
}

function createNewReviewOnServer(){
    var inputcoasterName = document.getElementById("input-coaster-name");
    var data = "name=" + encodeURIComponent(inputcoasterName.value); // '=' was missing
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
