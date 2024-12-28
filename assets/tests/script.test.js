/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const { selectTile, computerSelectTile } = require("../js/script");

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