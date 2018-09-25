import * as React from "react";
import styled, { keyframes } from "styled-components";
import { size, margin } from "./Box";
import circle from './circle.svg';
import { connectFour } from './connectFour';

const BoardBackground = styled.div`
  opacity: 0.5;
  display: block;
  position: absolute;
  top: 5px;
  width: ${(size + margin) * 7}px;
  height: ${(size + margin) * 6}px;
  z-index: 1;
`;
  // mask: url(${circle});

export const Column = styled.div`
  background-color: yellow;
  width: ${size}px;
  height: ${(size + margin) * 6}px;
  margin: 0 ${margin / 2}px;
  display: inline-block;
`;

export class BoardBackgroundWithColumns extends React.Component {
  render() {
    const results = [];

    for (let j = 0; j < connectFour.columns; j++) {
      results.push(<Column key={j} onClick={() => { console.log('asdf'); this.props.boxClicked(0, j, this.props.currentPlayerNumber); }}/>);
    }
    console.log(results);

    return <BoardBackground>{results}</BoardBackground>;
  }
}
