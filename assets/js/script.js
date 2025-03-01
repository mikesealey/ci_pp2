const player = {
  name: "Player1",
  symbol: "X",
  score: 0,
  color: "blue",
};

const computer = {
  name: "Computer",
  symbol: "O",
  score: 0,
  color: "red",
};

let winStatus = false;
let drawStatus = false;
let currentTurn = player;

/**
 * Invoke with the clicked-on tile, and the current player.
 * Set the current player's symbol as the tile's inner-text
 * @param {object} tile
 * @param {object} player
 * @returns
 */
export function selectTile(tile, player) {
  if (winStatus) {
    // If someone has already won, don't run
    return;
  }

  tile.classList.add(player.color);
  if (tile.innerText === "?") {
    tile.innerText = player.symbol;

    if (player === computer) {
      $("#console").append(
        `<div><span class="computer-name">${player.name}</span> selected ${tile.id}</div>`
      );
    } else {
      $("#console").append(
        `<div><span class="player-name">${player.name}</span> selected ${tile.id}</div>`
      );
    }

    player.score += 1;
    setAndFetchTopScore();
    return true;
  } else {
    $("#console").append(
      `<div>Invalid tile selection - please try again.</div>`
    );
    return false; // used in playGame function
  }
}

/**
 * Runs the computer's turn
 * Finds all available tiles and selects one as it's own
 */
export function computerSelectTile() {
  if (winStatus) {
    // If someone has already won, don't run
    return;
  }
  checkDrawStatus($(".tiles"));
  if (drawStatus) {
    // Check if it's a draw, if it is don't run any further
    return;
  }
  $("#console").append(
    `<div><span class="computer-name">${computer.name}</span> is thinking</div>`
  );
  // setTimeout to random time betweet 1 and 3 seconds to give the ilusion of thinking, then choose a tile
  setTimeout(() => {
    let possibleTiles = $(".tile").filter(function () {
      return $(this).text() === "?";
    });

    if (possibleTiles.length > 0) {
      // If there are still tiles left to play
      let index = Math.floor(Math.random() * possibleTiles.length);
      selectTile(possibleTiles[index], computer);

      if (checkWinStatus($(".tile"), computer)) {
        // If the computer wins
        $("#console").append(
          `<div><span class="computer-name">${computer.name}</span> has won the game!</div>`,
          `<div><span class="player-name">${player.name}'s</span> score has been reset to zero!</div>`
        );
        player.score = 0;
        setAndFetchTopScore();
        $("#console").append(
          `<div>Double-click a tile to reset the board and play again.</div>`
        );
        $(".tile").on("click", () => {
          resetGame("loss", computer);
        });
        return; // No need to run anything else in this function
      }
      checkDrawStatus($(".tile"));

      if (!winStatus) {
        currentTurn = player; // Switch turn back to the player
        $("#console").append(
          `<div><span class="player-name">${player.name}</span>, it's your turn!</div>`
        );
      }
    }
  }, Math.ceil(Math.random() * 3000));
}
/**
 * Invoke witth $(".tile") (all tiles on the board) and currentPlayer
 * Checks if the currentPlayer has won by comparing their symbol against winningPatters
 * @param {object} tiles
 * @param {object} player
 * @returns
 */
export function checkWinStatus(tiles, thisPlayer) {
  if (winStatus) {
    // If someone has already won, don't run
    return;
  }

  let playersTiles = [];
  // tiles comes in as an object
  let tileKeys = Object.keys(tiles);

  // Loop over keys to filter by player
  tileKeys.forEach((tileKey) => {
    if (tiles[tileKey].innerText === thisPlayer.symbol) {
      // If the tile belongs to the player, push it's id to the array
      playersTiles.push(tiles[tileKey].id);
    }
  });

  //Check each player's tiles against winning patterns
  let winningPatterns = [
    ["a1", "a2", "a3"], // Top Row
    ["b1", "b2", "b3"], // Middle Row
    ["c1", "c2", "c3"], // Botton Row
    ["a1", "b1", "c1"], // Left Column
    ["a2", "b2", "c2"], // Middle Column
    ["a3", "b3", "c3"], // Right Column
    ["a1", "b2", "c3"], // Top Left to bottom right diagonal
    ["a3", "b2", "c1"], // Top right to bottom left diagonal
  ];

  winningPatterns.forEach((pattern) => {
    if (
      playersTiles.includes(pattern[0]) &&
      playersTiles.includes(pattern[1]) &&
      playersTiles.includes(pattern[2])
    ) {
      winStatus = true;
    }
  });
  setAndFetchTopScore();
  if (winStatus && currentTurn === player) {
    $("#console").append(
      `<div><span class="player-name">${player.name}</span> wins!</div>`
    );
  }
  if (winStatus && currentTurn === computer) {
    $("#console").append(
      `<div><span class="computer-name">${computer.name}</span> wins!</div>`
    );
  }
  return winStatus;
}

/**
 * Invoke with $(".tiles")
 * returns false if the game is incomplete, or not a draw
 * returns true if the game has been completed
 * Should be used in conjunction with checkWinStatus
 * @param {object} tiles
 * @returns
 */
export function checkDrawStatus(tiles) {
  let computerTiles = [];
  let playerTiles = [];
  let remainingTiles = [];

  // Loop over tiles to check their content
  let tileKeys = Object.keys(tiles);
  tileKeys.forEach((tile) => {
    if (tiles[tile].innerText === "X") {
      playerTiles.push(tiles[tile]);
    } else if (tiles[tile].innerText === "O") {
      computerTiles.push(tiles[tile]);
    } else {
      remainingTiles.push(tiles[tile]);
    }
  });

  if (computerTiles.length === 5 && playerTiles.length === 4) {
    // If the computer has 5 and the player has 4, it must be a draw
    drawStatus = true;
    return true;
  } else if (computerTiles.length === 4 && playerTiles.length === 5) {
    // If the computer has 4 tiles, and the player has 5, and nobody has won, it must be a draw
    drawStatus = true;
    return true;
  } else {
    return false;
  }
}

/**
 * Invoked by the welcome function
 * Takes no parameters/arguments
 * returns nothing as a function
 * switches betwween player and computer taking turns to select tiles
 */
export function playGame() {
  $(".tile").on("click", function () {
    if (currentTurn === player && !winStatus && !drawStatus) {
      const isValidSelection = selectTile(this, player);
      if (isValidSelection) {
        if (checkWinStatus($(".tile"), currentTurn)) {
          $("#console").append(
            `<div><span class="player-name">${player.name}</span> has won the game!</div>`
          );

          $("#console").append(
            `<div>Double-click a tile to reset the board and play again`
          );
          // And use resetGame to play another
          $(".tile").on("click", () => {
            resetGame("win", player);
          });
        }

        if (checkDrawStatus($(".tile"))) {
          $("#console").append(`<div>It's a draw</div>`);
          // And use resetGame to play another
          resetGame("draw");
        }

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
 * possible reasons game should be reset
 * win
 * draw
 * loss
 */
export function resetGame(reason, winner) {
  // Reset the grid
  $(".tile").text("?");
  $(".tile").removeClass("red blue");

  if (reason === "win") {
    if (winner === player) {
      computer.score = 0; // Reset the loser's score
    } else {
      player.score = 0;
    }
  } else if (reason === "draw") {
    $("#console").append(
      `<div>New game! <span class="player-name">${player.name}</span>, it's your turn!</div>`
    );
  } else if (reason === "loss") {
    player.score = 0; // Reset the player's score
    $("#console").append(
      `<div>New game! <span class="player-name">${player.name}</span>, it's your turn!</div>`
    );
  }

  // Reset statuses
  winStatus = false;
  drawStatus = false;
  currentTurn = player;

  // Reattach the game logic to tiles
  $(".tile")
    .off("click")
    .one("click", function () {
      playGame();
    });
}

/**
 * Takes no arguments/parameters
 * Greets the user, and invites them to play a match
 * listens out for a click on the game board, which invokes playGame
 */
export function welcome() {
  const commands = [
    "<div>Are you ready to go toe-to-toe in the battle of Xs and Os?</div>",
    "<div>Connect 3 Xs, horizontally, vertically, or diagonally, to beat the computer and claim the win.</div>",
    "<div>Each successive move you make will increase your score, but losing a single round will mean you have to start again, and your score will be reset to 0!</div>",
    "<div><b><em>Can you beat the top score?</em></b></div>",
    "<div>For anyone using a screen reader to play, each tile is given a grid reference where the letters denote rows, and tiles are numbered from left to right. For example, tile c2 is the third row from the top, second from the left.</div>",
    // multi-line command
    `
        <form id="name-form" onsubmit="return false;">
            <label for="name">Enter your name:</label>
            <input type="text" id="name" name="name" required>
            <button type="submit">Submit</button>
        </form>
        `,
  ];

  commands.forEach((command, i) => {
    setTimeout(() => {
      $("#console").append(command);
      if (i === commands.length - 1) {
        // If this is the last command, enable clicking to reset/start the game
        $("form").on("submit", function (event) {
          // Event Listener can only be added after form is appended to "console"
          event.preventDefault();
          player.name = $("#name").val();
          $("#name-form").find("input, button").prop("disabled", true);
          $("#console").append(
            `<div>Welcome, <span class="player-name">${player.name}</span>, double-click a tile to get started!</div>`
          );
          $(".tile").on("click", resetGame());
          $("#scores-buttons").append("<button class='scoreboard-button'><b>How to Play</b></button>") // Adds a "Show rules" button 
          $(".scoreboard-button").on("click", showRules); // Allows 'Showw Rules' button to work
        });
      }
    }, 1500 * i);
  });
}

/**
 * Takes a number, and generates a square grid of tiles based on that number
 * Currently only works with a grid-size of 3, but allows for expansions at a later date.
 * @param {number} gridSize
 */
export function generateGrid(size) {
  const board = $("#board");

  for (let i = 0; i < size; i++) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const rowId = alphabet[i];
    const row = $(`<div id="${rowId}" class="row"></div>`);

    for (let j = 1; j <= size; j++) {
      const tileId = `${rowId}${j}`;
      const tile = $(
        `<div id="${tileId}" class="tile" aria-label="${tileId}" tabindex="0">?</div>`
      );
      row.append(tile);
    }

    board.append(row);
    $("#a1").text("Tic");
    $("#b2").text("Tac");
    $("#c3").text("Toe");
  }
}

/**
 * Invoked on screen load, and at each turn (player and computer)
 * On screen load, checks if a score exists in local storage
 *
 */
export function setAndFetchTopScore() {
  // Get score from local storage (if exists)
  // Or take an empty object
  let storedScore = {};
  try {
    const storedData = localStorage.getItem("topScore");
    if (storedData) {
      storedScore = JSON.parse(storedData);
    }
  } catch (e) {
    console.error("Error reading from localStorage:", e);
  }

  // Check current score against the scored score (or 0 - no stored-score will exist on the first play)
  if (player.score > (storedScore.score || 0)) {
    // Update localStorage with the new top score
    localStorage.setItem("topScore", JSON.stringify(player));
    storedScore = player.score;
  }

  $("#current-score").text(player.score);
  $("#top-score").text(storedScore.score);
  $("#top-player").text(storedScore.name);
}

export function showRules(){
  const howToPlayStatements = [
    "<div><b>Objective:</b> Mark three tiles in line, either horizontally, vertically, or diagonally</div>",
    "<div><b>Gameplay:</b>Take it in turns to select a tile</div>",
    "<div>Each time you select a tile your score will increase</div>",
    "<div>But losing a single round will revert your score to 0</div>",
    "<div>Keep playing as long as you can and try to beat the local top score</div>",
  ]
  howToPlayStatements.forEach((statement)=> {
    $("#console").append(statement)
  })
}

$(document).ready(function () {
  generateGrid(3);
  setAndFetchTopScore();
  welcome();
});
