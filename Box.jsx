import * as React from "react";
import styled, { keyframes } from "styled-components";

export const size = 60;
export const margin = 10;

const WrapperBox = styled.div`
  width: ${size}px;
  height: ${size}px;
  display: block;
  margin-bottom: ${margin}px;
  margin-top: 3px;
  text-align: center;
  border-radius: 50%;
  background-color: #ced0fb;
  transition: all 1s ease-in-out;
  z-index: 2;
`;

const BoxKeyframe = keyframes`
  0% {
    transform: translateY(-${(size + margin * 2) * 6}px);
  }
  100% {
    transform: translateY(0);
  }
`;

const PlayerOneBox = styled(WrapperBox)`
  background-color: #ff0000;
  animation: 1s ease-out 0s 1 ${BoxKeyframe};
  z-index: 0;
`;

const PlayerTwoBox = styled(WrapperBox)`
  background-color: #000000;
  animation: 1s ease-out 0s 1 ${BoxKeyframe};
  z-index: 0;
`;

export class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moveToPosition: false };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  render() {
    if (this.props.player == 1) {
      return (
        <PlayerOneBox
          onClick={this.onClickHandler}
          moveToPosition={this.state.moveToPosition}
        />
      );
    }

    if (this.props.player == 2) {
      return (
        <PlayerTwoBox
          onClick={this.onClickHandler}
          moveToPosition={this.state.moveToPosition}
        />
      );
    }

    return <WrapperBox onClick={this.onClickHandler} moveToPosition={true} />;
  }

  onClickHandler() {
    this.props.onClick();
  }
}
