let player = {
    name: "MikeTest",
    symbol: "X",
    score: 0
}

function selectTile(tile, player) {
    tile.innerText = player.symbol
    $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
    player.score += 1

}



$(document).ready(function () {
    // Event listener for Clicking on Tiles
    $('.tile').on('click', function() {
        selectTile(this, player);
    });
});

module.exports = selectTile;