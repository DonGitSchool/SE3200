console.log("connected");

function hello(){
    var button = document.getElementById("HelloButton");
    var el = document.getElementById("name");
    var oldinner= document.getElementById("")
    if (button.innerHTML === "Say Hello") {
        console.log("name:", el);
        el.innerHTML = "Hello JavaScript";
        el.style.color = "green";
        document.getElementById("image1").src="https://i.gifer.com/VoBm.gif";
        button.innerHTML = "Say Goodbye";
    } else if (button.innerHTML === "Say Goodbye") {
        // Reset to original values
        el.innerHTML = "Goodbye JavaScript";
        el.style.color = "";
        document.getElementById("image1").src = "https://i.pinimg.com/originals/a3/55/59/a355591fa63bab38bf68b43118132543.gif";
        button.innerHTML = "Say Hello";
    }
}
