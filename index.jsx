import { connectFour as ConnectFour } from "./connectFour";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const size = 60;
const margin = 10;

const WrapperBox = styled.div`
  width: ${size}px;
  height: ${size}px;
  background-color: #ccc;
  display: inline-block;
  margin: ${margin}px;
  text-align: center;
  border-radius: 50%;
`;

const PlayerOneBox = styled(WrapperBox)`
  background-color: #ff0000;
`;

const PlayerTwoBox = styled(WrapperBox)`
  background-color: #000000;
`;

class Box extends React.Component {
  render() {
    if (this.props.player == 1) {
      return <PlayerOneBox onClick={this.props.onClick}/>;
    }

    if (this.props.player == 2) {
      return <PlayerTwoBox onClick={this.props.onClick}/>;
    }

    return <WrapperBox onClick={this.props.onClick}/>;
  }
}

const BoardBackground = styled.div`
  background-color: yellow;
  display: inline-block;
  width: ${(size + margin * 2) * 7}px;
`;

class ConnectFourBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {board: ConnectFour.board, currentPlayerNumber: 1, winner: null};
  }

  render() {
    const rows = this.props.rows;
    const columns = this.props.columns;
    const board = [];

    if (!this.state.board)
      return;

    for (let i = 0; i < rows; i++) {
      board[i] = [];

      for (let j = 0; j < columns; j++) {
        if (this.state.board[i])
          board[i].push(
            <Box key={`${i}, ${j}`} player={this.state.board[i][j]} onClick={() => {
              this.props.boxClicked(i, j, this.state.currentPlayerNumber);

              let nextPlayer = null;

              if (this.state.currentPlayerNumber == 1)
                nextPlayer = 2;

              if (this.state.currentPlayerNumber == 2)
                nextPlayer = 1;

              this.setState({board: ConnectFour.board, currentPlayerNumber: nextPlayer, winner: ConnectFour.checkHasWinner()});
            }}/>
          );
      }
    }

    const winner = this.state.winner;
    const winnerComponent = winner ? <div>Player {this.state.winner} wins!</div> : null;

    return (
      <React.Fragment>
        {winnerComponent}

        <BoardBackground>{
          board
        }</BoardBackground>
    </React.Fragment>
    );
  }
}

let App = document.getElementById("app");
ReactDOM.render(<ConnectFourBoard rows={ConnectFour.rows} columns={ConnectFour.columns} boxClicked={(i, j, playerNumber) => ConnectFour.setPlayer(i, j, playerNumber)} />, App);
