import * as React from "react";
import { connectFour as ConnectFour } from "./connectFour";
import styled, { keyframes } from "styled-components";
import { Box } from "./Box";
import { BoardBackgroundWithColumns, Column } from "./backgroundBoard";
import { size, margin } from "./Box";
import { NameRenderer } from "./nameRenderer";

export class ConnectFourBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ConnectFour.board,
      currentPlayerNumber: 1,
      winner: null,
      playerOneName: null,
      playerTwoName: null
    };

    this.onBoxClicked = this.onBoxClicked.bind(this);
  }

  render() {
    if (!this.state.playerOneSet)
      return (
        <React.Fragment>
          <label>Player 1's name:</label>
          <NameRenderer
            name={this.state.playerOneName}
            onChangeHandler={name =>
              this.setState({ playerOneName: name.target.value })
            }
            markAsDone={() => this.setState({ playerOneSet: true })}
          />
        </React.Fragment>
      );

    if (!this.state.playerTwoSet)
      return (
        <React.Fragment>
          <label>Player 2's name:</label>
          <NameRenderer
            name={this.state.playerTwoName}
            onChangeHandler={name =>
              this.setState({ playerTwoName: name.target.value })
            }
            markAsDone={() => this.setState({ playerTwoSet: true })}
          />
        </React.Fragment>
      );

    const rows = this.props.rows;
    const columns = this.props.columns;
    const board = [];

    if (!this.state.board) return;

    for (let j = 0; j < columns; j++) {
      board[j] = [];

      for (let i = 0; i < rows; i++) {
        if (this.state.board[i])
          board[j].push(
            <Box
              key={`${i}, ${j}`}
              player={this.state.board[i][j]}
            />
          );
      }
    }

    const winner = this.state.winner;
    const winnerComponent = winner ? (
      <div>Player {this.state.winner} wins!</div>
    ) : null;

    return (
      <React.Fragment>
        {winnerComponent}
        {board.map((column, index) => {
          return <Column key={index}>{column}</Column>;
        })}
        <BoardBackgroundWithColumns
          boxClicked={this.onBoxClicked}
          currentPlayerNumber={this.state.currentPlayerNumber}
        />
      </React.Fragment>
    );
  }

  onBoxClicked(i, j) {
    this.props.boxClicked(i, j, this.state.currentPlayerNumber);

    let nextPlayer = null;

    if (this.state.currentPlayerNumber == 1) nextPlayer = 2;

    if (this.state.currentPlayerNumber == 2) nextPlayer = 1;

    this.setState({
      board: ConnectFour.board,
      currentPlayerNumber: nextPlayer,
      winner: ConnectFour.checkHasWinner()
    });
  }
}
