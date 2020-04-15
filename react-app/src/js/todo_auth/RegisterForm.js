import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register, clearRegisterErrorMessage } from "./actions";
import RegisterFormErrors from "./RegisterFormErrors";

export class RegisterForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    clearRegisterErrorMessage: PropTypes.func,
    errors: PropTypes.shape({
      username: PropTypes.arrayOf(PropTypes.string),
      password: PropTypes.arrayOf(PropTypes.string)
    })
  };

  static defaultProps = {
    history: null,
    successMessage: null,
    errors: null,
    clearRegisterErrorMessage: () => {}
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
    const { username, password } = this.state;
    const { register } = this.props;
    register(username, password);
  };

  render() {
    const { username, password } = this.state;
    const { errors } = this.props;

    return (
      <Container className="register-body-wrapper">
        <div className="register-wrapper">
          <h3 className="join-us-subtitle">Join Us</h3>
          <h1 className="create-your-account-subtitle">Create your account</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formGroupName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="username"
                placeholder=""
                onChange={e => this.setState({ username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder=""
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <Button
              disabled={!username || !password}
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
  clearRegisterErrorMessage: () => dispatch(clearRegisterErrorMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
