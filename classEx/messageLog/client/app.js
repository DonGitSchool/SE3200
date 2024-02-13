console.log("connected");

function generateReviewElements(){
    var coasterReview = document.createElement("h3");
    coasterReview.innerHTML = coasterName;
    coasterReviewsWrapper.appendChild(coasterReview);
    var horozontalRow = document.createElement ("hr");
    coasterReviewsWrapper.appendChild(horozontalRow)
}
function loadReviewsFromServer(){
    fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
            response.json()
            .then(function(data){
                console.log(data);
                var rollercoasters = data;
                var coasterReviewsWrapper = document.querySelector("section")
                rollercoasters.forEach(generateReviewElements)
            })
        })
    }

function createNewReviewOnServer(){
    var inputCoasterName = document.getElementById("input-coaster-name");
    var data = "name" + encodeURIComponent(inputCoasterName.value);
    console.log("data to be sent to server", data)
    fetch("http://localhost:8080/rollercoasters",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(function(response){
            console.log("New Review Created", response)
        })
    }

var addReviewButton = document.getElementById("add-review-button");
addReviewButton.onclick = createNewReviewOnServer;

loadReviewsFromServer()