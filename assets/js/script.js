function selectTile(tile, player) {
    tile.innerText = player.symbol
    $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
}

$(document).ready(function () {
    let player = {
        name: "Mike",
        symbol: "X",
        score: 0
    }
    $('.tile').on('click', function() {
        selectTile(this, player);
    });
});

module.exports = selectTile;