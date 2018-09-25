import * as React from "react";
import * as ReactDOM from "react-dom";
import { connectFour as ConnectFour } from "./connectFour";
import { ConnectFourBoard } from './connectFourBoard';

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
