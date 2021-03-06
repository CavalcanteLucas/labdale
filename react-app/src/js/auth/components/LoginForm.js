import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login, clearLoginErrors } from "../actions";
import FormErrors from "../../FormErrors";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    loginErrors: PropTypes.object,
    clearLoginErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    loginErrors: null
  };

  componentWillUnmount() {
    const { clearLoginErrors } = this.props;
    clearLoginErrors();
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    const { loginErrors } = this.props;

    return (
      <div className="auth-form-card">
        <Row className="justify-content-md-center">
          <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="form-username">
                <Form.Label>
                  <strong>Username</strong>
                </Form.Label>
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
                <Form.Label className="password-label">
                  <strong>Password</strong>
                </Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={this.handleInputChange}
                />
                <Form.Text className="text-muted">
                  <Link to="/password_reset">Forgot password?</Link>
                </Form.Text>
              </Form.Group>
              {loginErrors ? <FormErrors errors={loginErrors} /> : null}
              <Button variant="success" type="submit" block>
                Sign in
              </Button>
              <Form.Text style={{ textAlign: "center" }}>
                Not a user yet? <Link to="/register">Create a login</Link>.
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginErrors: state.auth.loginErrors
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  clearLoginErrors: () => dispatch(clearLoginErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
