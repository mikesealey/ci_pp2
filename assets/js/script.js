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
    if (tile.innerText === "?"){
        tile.innerText = player.symbol
        $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
        player.score += 1
    } else {
        $("#console").append(`<div>Invalid tile selection - please try again.</div>`)
    }
    
}

function computerSelectTile(){
    let possibleTiles = $('.tile').filter(function() {
        return $(this).text() === '?'
    })
    console.log(possibleTiles.length)
    

    let index = Math.floor(Math.random() * possibleTiles.length)
    possibleTiles.length ? selectTile(possibleTiles[index], computer) : ""
}

function checkWinStatus(tiles, player) {
    console.log(tiles)
    let winStatus = false
    let playersTiles = []
    // tiles comes in as an object
    let tileKeys = Object.keys(tiles)

    // Loop over keys to filter by player
    tileKeys.forEach((tileKey)=> {
        if (tiles[tileKey].innerText === player.symbol) {
            // If the tile belongs to the player, push it's id to the array
            playersTiles.push(tiles[tileKey].id)
        }
    })

    console.log(playersTiles)
    
    
    //Check each player's tiles against winning patterns
    let winningPatterns = [
        ["a1", "a2", "a3"], // Top Row
        ["b1", "b2", "b3"], // Middle Row
        ["c1", "c2", "c3"], // Botton Row
        ["a1", "b1", "c1"], // Left Column
        ["a2", "b2", "c2"], // Middle Column
        ["a3", "b3", "c3"], // Right Column
        ["a1", "b2", "c3"], // Top Left to bottom right diagonal
        ["a3", "b2", "c1"] // Loft right to bottom left diagonal
    ]

    winningPatterns.forEach((pattern) => {
        if (playersTiles.includes(pattern[0]) && playersTiles.includes(pattern[1]) && playersTiles.includes(pattern[2])){
            winStatus = true
        }
    })

    winStatus ? console.log("Someone won!!") : ""
    return winStatus
}

$(document).ready(function () {
    // Event listener for Clicking on Tiles
    $('.tile').on('click', function() {
        selectTile(this, player);
        checkWinStatus($('.tile'), player)
    });

    $("#test").on("click", function() {
        computerSelectTile()
    })

});

module.exports = { selectTile, computerSelectTile, checkWinStatus }