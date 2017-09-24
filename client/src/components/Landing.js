import React, { Component } from "react";

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loggedInOnly();
  }

  render() {
    return (
      <div>
        <h2>
          Welcome {this.props.email}, to the landing page!
        </h2>
        <br />
        <br />
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}
