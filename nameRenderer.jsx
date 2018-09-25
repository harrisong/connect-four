import * as React from "react";

export class NameRenderer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.props.name || ""}
          onChange={this.props.onChangeHandler}
        />
        <button onClick={this.props.markAsDone}>Done</button>
      </React.Fragment>
    );
  }
}
