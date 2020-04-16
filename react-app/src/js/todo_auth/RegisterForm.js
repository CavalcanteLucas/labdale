import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  register,
  clearRegisterErrorMessage,
  setInvalidConfirmationPasswordErrorMessage
} from "./actions";
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
    clearRegisterErrorMessage: PropTypes.func,
    setInvalidConfirmationPasswordErrorMessage: PropTypes.func,
    errors: PropTypes.shape({
      username: PropTypes.arrayOf(PropTypes.string),
      password: PropTypes.arrayOf(PropTypes.string)
    })
  };

  static defaultProps = {
    history: null,
    successMessage: null,
    errors: null,
    clearRegisterErrorMessage: () => {},
    setInvalidConfirmationPasswordErrorMessage: () => {}
  };

  componentDidUpdate() {
    const {
      successMessage,
      history,
      errors,
      clearRegisterErrorMessage
    } = this.props;

    if (successMessage) {
      history.push("/");
    }
    if (errors) {
      setTimeout(clearRegisterErrorMessage, 2000);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const { register, setInvalidConfirmationPasswordErrorMessage } = this.props;
    if (password === confirmPassword) {
      register(username, password);
    } else {
      setInvalidConfirmationPasswordErrorMessage();
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
      <Container className="register-body-wrapper">
        <div className="register-wrapper">
          <h3 className="join-us-subtitle">Join Us</h3>
          <h1 className="create-your-account-subtitle">Create your account</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="form-name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                required
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
                required
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
                required
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
            </Form.Group>
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
        {errors ? <RegisterFormErrors /> : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.todoAuth.successMessage,
  errors: state.todoAuth.errors
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(register(username, password)),
  clearRegisterErrorMessage: () => dispatch(clearRegisterErrorMessage()),
  setInvalidConfirmationPasswordErrorMessage: () =>
    dispatch(setInvalidConfirmationPasswordErrorMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
