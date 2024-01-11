console.log("connected");

function hello(){
    document.getElementById("demo").innerHTML = "Hello JavaScript";
    var el = document.getElementById("name");
    console.log("name:", el);
    el.innerHTML = "Hello JavaScript";
    el.style.color = "green";
    var image1 = document.getElementById("image1");
}

