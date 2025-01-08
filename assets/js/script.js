const player = {
    name: "MikeTest",
    symbol: "X",
    score: 0
}

const computer = {
    name: "Computer",
    symbol: "O",
    score: 0
}

let winStatus = false
let drawStatus = false
let currentTurn = player

$("#forceDraw").on("click", ()=> {
    $("#a1").text("X")
    $("#a2").text("O")
    $("#a3").text("X")
    $("#b1").text("O")
    $("#b2").text("O")
    $("#b3").text("X")
    $("#c1").text("X")
    $("#c2").text("X")
    $("#c3").text("O")


    checkDrawStatus($(".tile"))
}) 
/**
 * Invoke with the clicked-on tile, and the current player.
 * Set the current player's symbol as the tile's inner-text
 * 
 * @param {object} tile 
 * @param {object} player 
 * @returns
 */
function selectTile(tile, player) {
    console.log(currentTurn)
    if (winStatus) { // If someone has already won, don't run
        return
    }

    if (tile.innerText === "?"){
        tile.innerText = player.symbol
        $("#console").append(`<div>${player.name} selected ${tile.id}</div>`)
        player.score += 1
        return true
    } else {
        $("#console").append(`<div>Invalid tile selection - please try again.</div>`)
        return false // used in playGame function
    }

    // console.log("player " + player.score + ":" + computer.score + " computer")
}

/**
 * Runs the computer's turn
 * Finds all available tiles and selects one as it's own
 */
function computerSelectTile(){
    if (winStatus) { // If someone has already won, don't run
        return
    }
    checkDrawStatus($(".tiles"))
    if (drawStatus) {
        console.log("Draw!")
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
    }, Math.ceil(Math.random() * 5) // should be 5000, changed for testing purposes
    )
    
}
/**
 * Invoke witth $(".tile") (all tiles on the board) and currentPlayer
 * Checks if the currentPlayer has won by comparing their symbol against winningPatters
 * @param {object} tiles 
 * @param {object} player 
 * @returns 
 */
function checkWinStatus(tiles, player) {
    console.log("Checking for a winner")
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

    $("#MikeScore").text(player.score)
    $("#ComputerScore").text(computer.score)

    winStatus ? console.log("Someone won!!") : ""
    winStatus ?  $("#console").append(`<div>${player.name} wins!</div>`) : ""
    console.log(winStatus)
    return winStatus
}

/**
 * Invoke with $(".tiles")
 * returns false if the game is incomplete, or not a draw
 * returns true if the game has been completed
 * Should be used in conjunction with checkWinStatus
 * @param {object} tiles 
 * @returns 
 */
function checkDrawStatus(tiles){
    console.log("Checking draw status")
    let computerTiles = []
    let playerTiles = []
    let remainingTiles = []

    // Loop over tiles to check their content
    let tileKeys = Object.keys(tiles)
    tileKeys.forEach((tile) => {
        // console.log(tiles[tile])
        if (tiles[tile].innerText === "X") {
            playerTiles.push(tiles[tile])
        } else if (tiles[tile].innerText === "O") {
            computerTiles.push(tiles[tile])
        } else {
            remainingTiles.push(tiles[tile])
        }
    })

    console.log(computerTiles)
    console.log(playerTiles)
    console.log(remainingTiles)
    console.log("Draw status: " + drawStatus)
    if (computerTiles.length === 5 && playerTiles.length === 4) {
        // If the computer has 5 and the player has 4, it must be a draw
        drawStatus = true
        console.log("Draw status: " + drawStatus)
        return true
    } else if (computerTiles.length === 4 && playerTiles.length === 5) {
        // If the computer has 4 tiles, and the player has 5, and nobody has won, it must be a draw
        drawStatus = true
        console.log("Draw status: " + drawStatus)
        return true
    } else {
        return false
    }


}

/**
 * Invoked by the welcome function
 * Takes no parameters/arguments
 * returns nothing as a function
 * switches betwween player and computer taking turns to select tiles
 */
function playGame() {
    $(".tile").on("click", function () {
        if (currentTurn === player && !winStatus) {
            const isValidSelection = selectTile(this, player);
            if (isValidSelection) {
                checkWinStatus($(".tile"), player);
                
                if (!winStatus && !drawStatus) {
                    currentTurn = computer; // Switch to computer's turn only after a valid move
                    computerSelectTile();
                }
            }
        }
    });

    
     
    
    
}

/**
 * When invoked, resets the game-board back to a fresh match
 */
function resetGame() {
    // TODO: Finish this function so that players can play multiple back-to-back matches
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
    $("#console").append("<div>Welcome to TicTacToe</div>");
    winStatus = false;
    currentTurn = player;
}

/**
 * Takes no arguments/parameters
 * Greets the user, and invites them to play a match
 * listens out for a click on the game board, which invokes playGame
 */
function welcome() {
    $("#console").append("<div>To get started, click a tile</div>")
    
    $(".tile").on("click", playGame())
}

$(document).ready(function () {
    welcome()
    
});

module.exports = { selectTile, computerSelectTile, checkWinStatus, checkDrawStatus }