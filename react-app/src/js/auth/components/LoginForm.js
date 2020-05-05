import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login, clearLoginSuccessMessage } from "../actions";
import FormErrors from "../../FormErrors";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object,
    clearLoginSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    errors: null
  };

  componentDidMount() {
    const { clearLoginSuccessMessage } = this.props;
    clearLoginSuccessMessage();
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
    const { errors } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col>
          <div className="form-wrapper">
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
              {errors ? <FormErrors errors={errors} /> : null}
              <Button variant="success" type="submit" block>
                Sign in
              </Button>
              <Form.Text style={{ textAlign: "center" }}>
                Not a user yet? <Link to="/register">Create a login</Link>.
              </Form.Text>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  clearLoginSuccessMessage: () => dispatch(clearLoginSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
