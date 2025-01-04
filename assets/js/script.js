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

let winStatus = false
let currentTurn = player

function selectTile(tile, player) {
    console.log(currentTurn)
    if (winStatus) { // If someone has already won, don't run
        return
    }
    if (tile.innerText === "?"){
        tile.innerText = player.symbol
        $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
        player.score += 1
    } else {
        $("#console").append(`<div>Invalid tile selection - please try again.</div>`)
    }
    console.log("player " + player.score + ":" + computer.score + " computer")
}

function computerSelectTile(){
    if (winStatus) { // If someone has already won, don't run
        return
    }
    $("#console").append(`<div>${computer.name} is thinking</div>`)
    // setTimeout to random time betweet 1 and 5 seconds to give the ilusion of thinking, then choose a tile
    setTimeout(() => {
        let possibleTiles = $(".tile").filter(function() {
            return $(this).text() === '?';
        });

        if (possibleTiles.length > 0) {
            let index = Math.floor(Math.random() * possibleTiles.length);
            selectTile(possibleTiles[index], computer);
            checkWinStatus($(".tile"), computer);

            if (!winStatus) {
                currentTurn = player; // Switch turn back to the player
                $("#console").append(`<div>${player.name}, it's your turn!</div>`);
            }
        }
    }, Math.ceil(Math.random() * 5000)
    )
    
}

function checkWinStatus(tiles, player) {
    if (winStatus) { // If someone has already won, don't run
        return
    }
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
    winStatus ?  $("#console").append(`<div>${player.name} wins!</div>`) : ""
    return winStatus
}

function playGame() {
    $(".tile").on("click", function () {
        if (currentTurn === player && !winStatus) {
            selectTile(this, player);
            checkWinStatus($(".tile"), player);

            if (!winStatus) {
                currentTurn = computer; // Switch to computer's turn
                computerSelectTile();
            }
        }
    });

    $("#reset").on("click", function () {
        resetGame();
    });
}

function resetGame() {
    $(".tile").text("?").on("click", function () {
        if (currentTurn === player && !winStatus) {
            selectTile(this, player);
            checkWinStatus($(".tile"), player);

            if (!winStatus) {
                currentTurn = computer;
                computerSelectTile();
            }
        }
    });
    $("#console").empty();
    winStatus = false;
    currentTurn = player;
}

$(document).ready(function () {
    playGame()
});

module.exports = { selectTile, computerSelectTile, checkWinStatus }