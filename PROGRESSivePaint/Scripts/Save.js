function addSaveListener()
{
    var c = document.getElementById("playground");
    var  image = c.toDataURL("image/png");
    var a = $("<a>")
    .attr("href", image)
    .attr("download", "img.png")
    .appendTo("body");

    a[0].click();
    a.remove();
}
