import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "./actions";
import RegisterFormErrors from "./RegisterFormErrors";

export class RegisterForm extends React.Component {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    errors: PropTypes.shape({
      username: PropTypes.arrayOf(PropTypes.string),
      password: PropTypes.arrayOf(PropTypes.string)
    })
  };

  static defaultProps = {
    history: null,
    successMessage: null,
    errors: null
  };

  componentDidUpdate() {
    const { successMessage, history } = this.props;

    if (successMessage) {
      history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const { register } = this.props;
    if (password === confirmPassword) {
      register(username, password);
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  canSubmit = () => {
    const { username, password, confirmPassword } = this.state;
    const fieldsAreEmpty = !username || !password || !confirmPassword;
    const passwordsAreEqual = confirmPassword === password;
    return !fieldsAreEmpty && passwordsAreEqual;
  };

  render() {
    const { username, password, confirmPassword } = this.state;
    const { errors } = this.props;

    return (
      <div id="register-form">
        <Container>
          <div className="register-wrapper">
            <h3 className="join-us-subtitle">Join Us</h3>
            <h1 className="create-your-account-subtitle">
              Create your account
            </h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="form-name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  // required
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  // required
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="form-confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  // required
                  type="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              {errors ? <RegisterFormErrors /> : null}
              <Button
                disabled={!this.canSubmit()}
                variant="primary"
                type="submit"
                block
              >
                {" "}
                Create account
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.todoAuth.successMessage,
  errors: state.todoAuth.errors
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(register(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
