/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const selectTile = require("../js/script");

global.$ = $;

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Applying Markers to tiles", () => {
    test.each([
        ["a1", "X"],
        ["a2", "O"],
        ["a3", "X"],
        ["b1", "O"],
        ["b2", "X"],
        ["b3", "O"],
        ["c1", "X"],
        ["c2", "O"],
        ["c3", "X"],
    ])("updates tile %s with player %s", (tileId, player) => {
        const tile = document.getElementById(tileId);
        selectTile(tile, player);
        expect(tile.innerText).toBe(player.marker);
    });
});
