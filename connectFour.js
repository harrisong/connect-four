class ConnectFour {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];

    for (let i = 0; i < rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < columns; j++) {
        this.board[i][j] = null;
      }
    }

    this.board = [
      [null, null, null, null, null],
      [null, 1, null, null, null],
      [null, null, 1, null, null],
      [null, null, null, 1, null],
      [null, null, null, null, 1]
    ];
  }

  coordinatesWithinRange(i, j) {
    return i >= 0 && i < this.rows && j >= 0 && j < this.columns;
  }

  checkNeighbour(i, j, remaining = 4, dir = 'up') {
    if (remaining == 1)
      return true;

    const nextCooridnate = [
      {dir: 'bottom', new_i: i + 1, new_j: j},
      {dir: 'up', new_i: i - 1, new_j: j},
      {dir: 'right', new_i: i, new_j: j + 1},
      {dir: 'left', new_i: i, new_j: j - 1},
      {dir: 'right_bottom', new_i: i + 1, new_j: j + 1},
      {dir: 'left_bottom', new_i: i + 1, new_j: j - 1},
      {dir: 'left_up', new_i: i - 1, new_j: j - 1},
      {dir: 'right_up', new_i: i - 1, new_j: j + 1},
    ];

    for (let next of nextCooridnate) {
      if (this.coordinatesWithinRange(next.new_i, next.new_j) && dir == next.dir && this.board[next.new_i][next.new_j] == this.board[i][j])
        return this.checkNeighbour(next.new_i, next.new_j, remaining - 1, dir);
    }

    return false
  }

  checkHasWinner() {
    console.log(this.board);
    let directions = ['bottom', 'up', 'right', 'left', 'right_bottom', 'left_bottom', 'left_up', 'right_up'];


    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        for (let dir of directions) {
          if (this.board[i][j]) {
            if (this.checkNeighbour(i, j, 4, dir))
              return this.board[i][j]
          }
        }
      }
    }

    return false;
  }
}

let connectFour = new ConnectFour(6, 7);
export default connectFour;


// 0 0 0 0 0
// 0 1 0 0 0
// 0 0 1 0 0
// 0 0 0 1 0
// 0 0 0 0 1
