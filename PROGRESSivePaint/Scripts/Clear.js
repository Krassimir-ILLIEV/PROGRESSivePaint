function clearScreen() {

    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}