let player = {
    name: "MikeTest",
    symbol: "X",
    score: 0
}

let computer = {
    name: "Computer",
    symbol: "O",
    score: 0
}

function selectTile(tile, player) {
    tile.innerText = player.symbol
    $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
    player.score += 1

}

function computerSelectTile(){
    let possibleTiles = $('.tile').filter(function() {
        return $(this).text() === '?'
    })
    console.log(possibleTiles.length)
    

    let index = Math.floor(Math.random() * possibleTiles.length)
    possibleTiles.length ? selectTile(possibleTiles[index], computer) : ""
    
    

}

$(document).ready(function () {
    // Event listener for Clicking on Tiles
    $('.tile').on('click', function() {
        selectTile(this, player);
    });

    $("#test").on("click", function() {
        computerSelectTile()
    })
});

module.exports = { selectTile, computerSelectTile }