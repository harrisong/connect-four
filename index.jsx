import { connectFour as ConnectFour } from "./connectFour";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const WrapperBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  display: inline-block;
  margin: 10px;
  line-height: 30px;
  vertical-align: middle;
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
      return <PlayerOneBox />;
    }

    if (this.props.player == 2) {
      return <PlayerTwoBox />;
    }

    return <WrapperBox />;
  }
}

const BoardBackground = styled.div`
  background-color: yellow;
  display: inline-block;
  padding: 15px;
`;

class ConnectFourBoard extends React.Component {
  render() {
    const rows = ConnectFour.rows;
    const columns = ConnectFour.columns;
    const board = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (ConnectFour.board[i])
          board.push(
            <Box key={`${i}, ${j}`} player={ConnectFour.board[i][j]} />
          );
      }

      board.push(<br />);
    }

    const winner = ConnectFour.checkHasWinner();
    const winnerComponent = winner ? <div>Player {ConnectFour.checkHasWinner()} wins!</div> : null;

    return (
      <React.Fragment>
        {winnerComponent}

        <BoardBackground>{board}</BoardBackground>
      </React.Fragment>
    );
  }
}

let App = document.getElementById("app");
ReactDOM.render(<ConnectFourBoard />, App);
