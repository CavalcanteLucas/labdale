import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "./actions";
import RegisterFormErrors from "./RegisterFormErrors";

export class RegisterForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    errors: PropTypes.shape({
      username: PropTypes.arrayOf(PropTypes.string),
      email: PropTypes.arrayOf(PropTypes.string),
      password1: PropTypes.arrayOf(PropTypes.string),
      password2: PropTypes.arrayOf(PropTypes.string)
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
    const { username, email, password1, password2 } = this.state;
    const { register } = this.props;
    register(username, email, password1, password2);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password1, password2 } = this.state;
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
              <Form.Group controlId="form-username">
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
              <Form.Group controlId="form-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="text"
                  placeholder=""
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="form-password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password1"
                  required
                  type="password"
                  placeholder=""
                  value={password1}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="form-password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="password2"
                  required
                  type="password"
                  placeholder=""
                  value={password2}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              {errors ? <RegisterFormErrors /> : null}
              <Button variant="primary" type="submit" block>
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
  register: (username, email, password1, password2) =>
    dispatch(register(username, email, password1, password2))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
