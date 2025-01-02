/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const { selectTile, computerSelectTile, checkWinStatus } = require("../js/script");

global.$ = $;

beforeAll(() => {
    const fs = require("fs");
    const fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
    console.log(document.body.innerHTML);
});

describe("Applying Markers to tiles", () => {
    let playerTest;

    beforeEach(() => {
        playerTest = {
            name: "Mike",
            symbol: "X",
            score: 0
        };
    });

    test.each([
        ["a1"],
        ["a2"],
        ["a3"],
        ["b1"],
        ["b2"],
        ["b3"],
        ["c1"],
        ["c2"],
        ["c3"],
    ])("updates tile %s with player symbol", (tileId) => {
        console.log("Before test: ", playerTest);
        const tile = document.getElementById(tileId);
        selectTile(tile, playerTest);
        expect(tile.innerText).toBe(playerTest.symbol);
    });

    test.each([
        ["a1"],
        ["a2"],
        ["a3"],
        ["b1"],
        ["b2"],
        ["b3"],
        ["c1"],
        ["c2"],
        ["c3"],
    ])("increments player score after tile %s is marked", (tileId) => {
        console.log("Before score test: ", playerTest);
        const tile = document.getElementById(tileId);
        selectTile(tile, playerTest)
        expect(playerTest.score).toBe(1);
    });
});

describe("Computer-player makes a selection", ()=> {
    test('Computer selects any valid tile', () => {
        expect(Array.isArray(computerSelectTile())).toBe(true)
      });
})

describe("Check win-status", ()=> {
    let playerTest;

    beforeEach(() => {
        playerTest = {
            name: "Mike",
            symbol: "X",
            score: 0
        };
    });

    test.each([
        {  // Top Row Wins
            0: { id: "a1", innerText: "X" },
            1: { id: "a2", innerText: "X" },
            2: { id: "a3", innerText: "X" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "?" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "?" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "?" },
        },
        {  //  // Middle Row Wins
            0: { id: "a1", innerText: "?" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "?" },
            3: { id: "b1", innerText: "X" },
            4: { id: "b2", innerText: "X" },
            5: { id: "b3", innerText: "X" },
            6: { id: "c1", innerText: "?" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "?" },
        },
        {  //  Bottom Row Wins
            0: { id: "a1", innerText: "?" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "?" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "?" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "X" },
            7: { id: "c2", innerText: "X" },
            8: { id: "c3", innerText: "X" },
        },
        {  //  Left Column Wins
            0: { id: "a1", innerText: "X" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "?" },
            3: { id: "b1", innerText: "X" },
            4: { id: "b2", innerText: "?" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "X" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "?" },
        },
        {  //  Centre Column Wins
            0: { id: "a1", innerText: "?" },
            1: { id: "a2", innerText: "X" },
            2: { id: "a3", innerText: "?" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "X" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "?" },
            7: { id: "c2", innerText: "X" },
            8: { id: "c3", innerText: "?" },
        },
        {  //  Right Column Wins
            0: { id: "a1", innerText: "?" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "X" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "?" },
            5: { id: "b3", innerText: "X" },
            6: { id: "c1", innerText: "?" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "X" },
        },
        {  //  Top left, centre, bottom right Wins
            0: { id: "a1", innerText: "X" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "?" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "X" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "?" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "X" },
        },
        {  //  Top Right, centre, bottom left Wins
            0: { id: "a1", innerText: "?" },
            1: { id: "a2", innerText: "?" },
            2: { id: "a3", innerText: "X" },
            3: { id: "b1", innerText: "?" },
            4: { id: "b2", innerText: "X" },
            5: { id: "b3", innerText: "?" },
            6: { id: "c1", innerText: "X" },
            7: { id: "c2", innerText: "?" },
            8: { id: "c3", innerText: "?" },
        },


        ["a3", "b2", "c1"] // Loft right to bottom left diagonal
    ])("All winning criteria should return true", (tiles) => {
        expect(checkWinStatus(tiles, playerTest)).toBe(true)
    })
})

