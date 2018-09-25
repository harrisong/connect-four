import * as React from "react";
import styled, { keyframes } from "styled-components";
import { size, margin } from "./Box";
import circle from "./circle.svg";
import { connectFour } from "./connectFour";

const BoardBackground = styled.div`
  display: block;
  position: absolute;
  top: 5px;
  width: ${(size + margin) * 7}px;
  height: ${(size + margin) * 6}px;
  z-index: 1;
`;

export const Column = styled.div`
  background-image: url(${circle});
  background-position: 0 -2px;
  width: ${size}px;
  height: ${(size + margin) * 6}px;
  padding: 0 ${margin / 2}px;
  display: inline-block;
`;

export const GreyColumn = styled(Column)`
  background-color: #CCC;
  background-image: none;
`;

export class BoardBackgroundWithColumns extends React.Component {
  render() {
    const results = [];

    for (let j = 0; j < connectFour.columns; j++) {
      results.push(
        <Column
          key={j}
          onClick={() => {
            console.log("asdf");
            this.props.boxClicked(0, j, this.props.currentPlayerNumber);
          }}
        />
      );
    }
    console.log(results);

    return <BoardBackground>{results}</BoardBackground>;
  }
}