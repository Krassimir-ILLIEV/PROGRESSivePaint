function addLoadListener(e) {

    $('#elementToLoad').click();
}

function selectFile() {

    var context = document.getElementById('playground').getContext('2d');
    var img = new Image;
    img.onload = function () {
        // any new drawing will only overwrite existing pixels
        context.globalCompositeOperation = "copy";
        context.drawImage(img, 0, 0);
        // change the composite mode to destination-atop
        // any new drawing will not overwrite any existing pixels
        context.globalCompositeOperation = "source-over";

    }
    //alert($('#elementToLoad').prop("files")[0].name);
    //alert(document.getElementById('elementToLoad').files[0]);
    //    img.src = URL.createObjectURL(document.getElementById('elementToLoad').files[0]);
    img.src = URL.createObjectURL($('#elementToLoad').prop("files")[0]);
}
function createPalette() {
    var f = [
    "#ff0000,#ff4000,#ff8000,#ffbf00,#ffff00",
    "#bfff00,#80ff00,#40ff00,#00ff00,#00ff40",
    "#00ff80,#00ffbf,#00ffff,#00bfff,#0080ff",
    "#0040ff,#0000ff,#4000ff,#8000ff,#bf00ff",
    "#ff00ff,#ff00bf,#ff0080,#000000,#ffffff"];

    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');
    var delta = 30;
    for (var i = 0; i < f.length; i += 1) {
        var s = f[i].split(",");
        for (var j = 0; j < s.length; j += 1) {
            ctx.fillStyle = s[j]; //"rgb("+r+","+g+","+b+")";
            ctx.fillRect(i * delta, j * delta, delta-2, delta-2);
        }
    }

    ctx.strokeStyle = 'black';
    ctx.rect(0, 0, 150, 150);
    ctx.stroke();
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}



function setPalette() {
    $('#picker').css({ position: "absolute", zIndex: 10, cursor: 'pointer' }).hide();

    createPalette();

    $('#picker').click(function (event) {
        // getting user coordinates
        var canvas = document.getElementById('picker');
        var ctx = canvas.getContext('2d');
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;
        // getting image data and RGB values
        var img_data = ctx.getImageData(x, y, 1, 1).data;
        var R = img_data[0];
        var G = img_data[1];
        var B = img_data[2];
        var rgb = R + ',' + G + ',' + B;
        // convert RGB to HEX
        var hex = rgbToHex(R, G, B);
        // making the color the value of the input
        border.color = "rgb(" + rgb+")";
        //$('#rgb input').val(rgb);
        //$('#hex input').val('#' + hex);
    });


    $('#picker').hover(function () {
        $('#picker').show();
    },
    function () {
        $('#picker').hide();
    });

    $('#color').hover(function () {
        $('#picker').show();
        $('#picker').offset({
            top: $('#color').offset().top + 30,
            left: $('#color').offset().left
        });
    },
    function () {
        $('#picker').hide();
    });
}



function setBrush() {
    $('#sizeBrush').css({ position: "absolute", zIndex: 10, cursor: 'pointer' }).hide();
    $('#sizeBrush').hover(function () {
        $('#sizeBrush').show();
    },
    function () {
        $('#sizeBrush').hide();
    });

    $('#brush').hover(function () {
        $('#sizeBrush').show();
        $('#sizeBrush').offset({
            top: $('#brush').offset().top + 30,
            left: $('#brush').offset().left
        });
    },
    function () {
        $('#sizeBrush').hide();
    });

}

