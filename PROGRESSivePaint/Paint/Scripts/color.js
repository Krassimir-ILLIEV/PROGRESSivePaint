
function changeColor() {
    border.color = $(this).attr('id');
}

function addColorListeners() {
    $("#black").click(changeColor);
    $("#white").click(changeColor);
    $("#grey").click(changeColor);
    $("#darkRed").click(changeColor);
    $("#red").click(changeColor);
    $("#orange").click(changeColor);
    $("#yellow").click(changeColor);
    $("#green").click(changeColor);
    $("#turquoise").click(changeColor);
    $("#blue").click(changeColor);
    $("#purple").click(changeColor);
}
