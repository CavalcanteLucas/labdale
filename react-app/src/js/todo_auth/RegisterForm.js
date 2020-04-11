import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "./actions";

export class RegisterForm extends React.Component {
  onSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const response = await this.props.register(username, password);
    if (response === 201) {
      this.props.history.push("/");
    }
  };

  render() {
    const { errors } = this.props;

    const error = [];
    if (errors) {
      Object.keys(errors).map(field => {
        error.push(`${field}: ${errors[field][0]}`);
      });
    }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          <p>
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                onChange={e => this.setState({ username: e.target.value })}
              />
            </label>
          </p>
          <p>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </label>
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {/* Displaying errors */}
          {errors ? (
            <ul>
              {error.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.todoAuth.errors
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(register(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
