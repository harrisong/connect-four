const { connectFour } = require("../connectFour");

describe("connectFour", () => {
  it("should show has winner", () => {
    connectFour.board = [
      [2, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0]
    ];

    expect(connectFour.checkHasWinner()).toBe(1);
  });
});
