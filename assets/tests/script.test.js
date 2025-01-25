/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs");
const path = require("path");
global.$ = $;
import {
  selectTile,
  computerSelectTile,
  checkWinStatus,
  checkDrawStatus,
  playGame,
  resetGame,
  generateGrid,
  setAndFetchTopScore,
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
    // Three Rows
    console.log($("#board"))
    expect($("#board").children().length).toBe(12);
    // Each row has three columns
    // Get the rows of the board
    const rows = $("#board").children();
    // Loop over them to check they each have 12 child divs
    rows.each((index, row) => {
      expect($(row).children().length).toBe(12);
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
    resetGame()
    // Assert
    $(".tile").each((index, tile) => {
      // loops to check every tile
      expect($(tile).text()).toBe("?")
    });
  });
});
