


function addSaveListener()
{

    var c = document.getElementById("playground");
    //if (c.getContext) {
      // var ctx = c.getContext("2d");
       //var myImage = c.toDataURL("image/png");
    //}
    //var image = c.toDataURL("image/png").replace("image/png", "image/octet-stream");
    //document.write('<img src="' + img + '"/>');
    //document.write('<img src="img.png"/>');
    //window.location.href = image;


    var  image = c.toDataURL("image/png");
    var a = $("<a>")
    .attr("href", image)
    .attr("download", "img.png")
    .appendTo("body");

    a[0].click();

    a.remove();
}
