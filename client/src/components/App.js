import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import logo from "../logo.svg";
import "../App.css";

import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      error: "not logged in"
    };
  }

  userFetchOperation = async (operation, jsonData = {}) => {
    let result;
    try {
      result = await fetch(operation, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(jsonData)
      });

      result = await result.json();

      await this.setState({
        email: result.email || null,
        error: result.error || null
      });
    } catch (error) {
      await this.setState({
        email: null,
        error: `something went wrong during ${operation}`
      });
    }
  };

  authenticate = async () => {
    await this.userFetchOperation("authenticate");
  };

  register = async jsonData => {
    await this.userFetchOperation("register", jsonData);
    this.props.history.push("/");
  };

  login = async jsonData => {
    await this.userFetchOperation("login", jsonData);
    this.props.history.push("/");
  };

  logout = async () => {
    await this.userFetchOperation("logout");
    this.props.history.push("/login");
  };

  loggedInOnly = async () => {
    await this.authenticate();
    if (this.state.error || !this.state.email) {
      this.props.history.push("/login");
    }
  };

  loggedOutOnly = async () => {
    await this.authenticate();
    if (!this.state.error && this.state.email) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Authentification Demo</h2>
        </div>
        <br />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <Landing
                email={this.state.email}
                logout={this.logout}
                loggedInOnly={this.loggedInOnly}
              />}
          />
          <Route
            exact
            path="/login"
            render={() =>
              <Login login={this.login} loggedOutOnly={this.loggedOutOnly} />}
          />
          <Route
            exact
            path="/register"
            render={() =>
              <Register
                register={this.register}
                loggedOutOnly={this.loggedOutOnly}
              />}
          />
        </Switch>
      </div>
    );
  }
}

// Wrap App in "withRouter" so we can use this.props.push("route")
// to redirect to another route
export default withRouter(App);
