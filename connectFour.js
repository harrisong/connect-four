class ConnectFour {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];

    for (let i = 0; i < rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < columns; j++) {
        this.board[i][j] = 0;
      }
    }

    // this.board = [
    // [2, 0, 0, 0, 0, 0, 0],
    // [0, 2, 0, 0, 0, 0, 0],
    // [0, 0, 1, 0, 0, 0, 0],
    // [0, 0, 0, 1, 0, 0, 0],
    // [0, 0, 0, 0, 1, 0, 0],
    // [0, 0, 0, 0, 1, 1, 0]
    // ];
  }

  setPlayer(i, j, playerNumber) {
    for (let i = this.rows - 1; i >= 0; i--) {
      if (this.board[i][j] == 0 && playerNumber != null) {
        this.board[i][j] = playerNumber;
        return true;
      }
    }
  }

  coordinatesWithinRange(i, j) {
    return i >= 0 && i < this.rows && j >= 0 && j < this.columns;
  }

  checkNeighbour(i, j, remaining = 4, dir = "up") {
    if (!this.board[i][j]) return false;
    if (remaining == 1) return true;

    const nextCooridnate = {
      up: { new_i: i - 1, new_j: j },
      right: { new_i: i, new_j: j + 1 },
      right_bottom: { new_i: i + 1, new_j: j + 1 },
      right_up: { new_i: i - 1, new_j: j + 1 }
    };

    const next = nextCooridnate[dir];
    if (
      next &&
      this.coordinatesWithinRange(next.new_i, next.new_j) &&
      this.board[next.new_i][next.new_j] == this.board[i][j]
    )
      return this.checkNeighbour(next.new_i, next.new_j, remaining - 1, dir);

    return false;
  }

  checkHasWinner() {
    let directions = ["up", "right", "right_bottom", "right_up"];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        for (let dir of directions) {
          if (this.checkNeighbour(i, j, 4, dir)) return this.board[i][j];
        }
      }
    }

    return false;
  }
}

const connectFour = new ConnectFour(6, 7);
module.exports = { connectFour };
