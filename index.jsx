import { connectFour as ConnectFour } from "./connectFour";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const size = 60;
const margin = 10;

const WrapperBox = styled.div`
  width: ${size}px;
  height: ${size}px;
  display: inline-block;
  margin: ${margin}px;
  text-align: center;
  border-radius: 50%;
  background-color: #CCC;
  transition: all 1s ease-in-out;
`;


const BoxKeyframe = keyframes`
  0% {
    transform: translateY(-470px);
  }
  100% {
    transform: translateY(0);
  }
`;

const PlayerOneBox = styled(WrapperBox)`
  background-color: #ff0000;
  animation: 1s ease-out 0s 1 ${BoxKeyframe};
`;

const PlayerTwoBox = styled(WrapperBox)`
  background-color: #000000;
  animation: 1s ease-out 0s 1 ${BoxKeyframe};
`;

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {moveToPosition: false};
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  render() {
    if (this.props.player == 1) {
      return <PlayerOneBox onClick={this.onClickHandler} moveToPosition={this.state.moveToPosition}/>;
    }

    if (this.props.player == 2) {
      return <PlayerTwoBox onClick={this.onClickHandler} moveToPosition={this.state.moveToPosition}/>;
    }

    return <WrapperBox onClick={this.onClickHandler} moveToPosition={true}/>;
  }

  onClickHandler() {
    this.props.onClick();
    // setTimeout(function () {
      // this.setState({moveToPosition: true});
    // }.bind(this), 1000);
  }
}

const BoardBackground = styled.div`
  background-color: yellow;
  display: inline-block;
  width: ${(size + margin * 2) * 7}px;
`;

class NameRenderer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input type="text" value={this.props.name || ''} onChange={this.props.onChangeHandler} />
        <button onClick={this.props.markAsDone}>Done</button>
      </React.Fragment>
    );
  }
}

const Column = styled.div`
  width: ${(size + margin * 2)}px;
  height: ${(size + margin) * 6}px;
  display: inline-block;
`;

class ConnectFourBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ConnectFour.board,
      currentPlayerNumber: 1,
      winner: null,
      playerOneName: null,
      playerTwoName: null
    };
  }

  render() {
    if (!this.state.playerOneSet)
      return (
        <React.Fragment>
          <label>Player 1's name:</label>
          <NameRenderer
            name={this.state.playerOneName}
            onChangeHandler={name => this.setState({ playerOneName: name.target.value })}
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
            onChangeHandler={name => this.setState({ playerTwoName: name.target.value })}
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
              onClick={() => {
                this.props.boxClicked(i, j, this.state.currentPlayerNumber);

                let nextPlayer = null;

                if (this.state.currentPlayerNumber == 1) nextPlayer = 2;

                if (this.state.currentPlayerNumber == 2) nextPlayer = 1;

                this.setState({
                  board: ConnectFour.board,
                  currentPlayerNumber: nextPlayer,
                  winner: ConnectFour.checkHasWinner()
                });
              }}
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

        <BoardBackground>{
          board.map((column, index)=> {
            return (
              <Column key={index}>
                {column}
              </Column>
            );
          })
        }</BoardBackground>
      </React.Fragment>
    );
  }
}

let App = document.getElementById("app");
ReactDOM.render(
  <ConnectFourBoard
    rows={ConnectFour.rows}
    columns={ConnectFour.columns}
    boxClicked={(i, j, playerNumber) =>
        ConnectFour.setPlayer(i, j, playerNumber)
    }
  />,
  App
);
