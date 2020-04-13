import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "./actions";

export class RegisterForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    register: PropTypes.func,
    response: PropTypes.bool,
    errors: PropTypes.object,
    history: PropTypes.object
  };

  static defaultProps = {
    register: () => {},
    response: false,
    errors: null,
    history: null
  };

  componentDidUpdate(prevProps) {
    const { response, history } = this.props;
    if (response && response !== prevProps.response) {
      alert("User successfully created!");
      history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { register } = this.props;
    register(username, password);
  };

  render() {
    const { errors } = this.props;

    const error = [];
    if (errors) {
      Object.keys(errors).map(field =>
        error.push(`${field}: ${errors[field][0]}`)
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          <p>
            <label htmlFor="username">
              Username:&nbsp;
              <input
                type="text"
                id="username"
                required
                placeholder="Enter username"
                onChange={e => this.setState({ username: e.target.value })}
              />
            </label>
          </p>
          <p>
            <label htmlFor="password">
              Password:&nbsp;
              <input
                type="password"
                id="password"
                required
                placeholder="Enter password"
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
  response: state.todoAuth.response,
  errors: state.todoAuth.errors
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(register(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
