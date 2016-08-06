


function addSaveListener()
{

    var c = document.getElementById("playground");
    if (c.getContext) {
       var ctx = c.getContext("2d");
       var myImage = c.toDataURL("image/png");
    }
    var image = c.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
}
