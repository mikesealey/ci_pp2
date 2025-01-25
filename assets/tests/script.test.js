/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs");
const path = require("path");
global.$ = $;
import {
  selectTile,
  checkWinStatus,
  checkDrawStatus,
  resetGame,
  generateGrid,
} from "../js/script";

import { getByText } from "@testing-library/dom";

describe("Testing generateGrid()", () => {
  test("Generates a square grid of size 3", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(3);
    // Assert
    // Three Rows
    expect($("#board").children().length).toBe(3);
    // Each row has three columns
    // Get the rows of the board
    const rows = $("#board").children();
    // Loop over them to check they each have 3 child divs
    rows.each((index, row) => {
      expect($(row).children().length).toBe(3);
    });
  });

  // Not currently useful, but testting this functionality will make further developments easier
  test("Generates a square grid of size 12", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(12);
    // Assert
    // 12 Rows
    expect($("#board").children().length).toBe(12);
    // Each row has 12 columns
    // Get the rows of the board
    const rows = $("#board").children();
    // Loop over them to check they each have 12 child divs
    rows.each((index, row) => {
      expect($(row).children().length).toBe(12);
    });
  });

  test("Generates a square grid of size 26", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(26);
    // Assert
    // 26 Rows
    expect($("#board").children().length).toBe(26);
    // Each row has 26 columns
    // Get the rows of the board
    const rows = $("#board").children();
    // Loop over them to check they each have 26 child divs
    rows.each((index, row) => {
      expect($(row).children().length).toBe(26);
    });
  });

  test("Dresses the tiles with the TicTacToe text", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(3);
    // Assert
    expect($("#a1").text()).toBe("Tic");
    expect($("#b2").text()).toBe("Tac");
    expect($("#c3").text()).toBe("Toe");
  });
});

describe("Testing resetGame()", () => {
  test("Checks that all tiles have been revered to '?' innerText", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(3);
    resetGame();
    // Assert
    $(".tile").each((index, tile) => {
      // loops to check every tile
      expect($(tile).text()).toBe("?");
    });
  });

  test("Checks that all tiles have been revered to '?' innerText on a grid of 26*26", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Invoke
    generateGrid(26);
    resetGame();
    // Assert
    $(".tile").each((index, tile) => {
      // loops to check every tile
      expect($(tile).text()).toBe("?");
    });
  });
});

describe("Testing selectTile()", () => {
  test("checks that a player can select a tile", () => {
    // mock a DOM locally
    document.body.innerHTML = '<div id="board"></div>';
    // Player object
    const testPlayer = {
      name: "Jest",
      symbol: "X",
      score: 0,
      color: "red",
    };
    // Invoke
    generateGrid(3);
    resetGame();

    const tile = document.getElementById("a1");
    selectTile(tile, testPlayer);
    // Assert
    // inner text of tile should be equal to player.symbol
    expect(tile.classList.contains(testPlayer.color)).toBe(true);
  });
});
