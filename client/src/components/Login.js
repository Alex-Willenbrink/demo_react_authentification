import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };
  }

  componentWillMount() {
    this.props.loggedOutOnly();
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.onSubmitForm}>
          <label>
            Email:
            <input type="text" name="email" onChange={this.onInputChange} />
          </label>
          <br />
          <br />

          <label>
            Password:
            <input type="text" name="password" onChange={this.onInputChange} />
          </label>
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <br />
        <br />
        <NavLink to="/register">Register Page</NavLink>
      </div>
    );
  }
}

export default Login;
