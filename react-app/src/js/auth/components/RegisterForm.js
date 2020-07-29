import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register, clearRegisterErrors } from "../actions";
import FormErrors from "../../FormErrors";

export class RegisterForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    clearRegisterErrors: PropTypes.func.isRequired,
    history: PropTypes.object,
    registerErrors: PropTypes.object,
    registerIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    history: null,
    registerErrors: null,
    registerIsSuccessfull: false
  };

  componentDidUpdate(prevProps) {
    const { registerIsSuccessfull, history } = this.props;
    if (registerIsSuccessfull && !prevProps.registerIsSuccessfull) {
      history.push("/");
    }
  }

  componentWillUnmount() {
    const { clearRegisterErrors } = this.props;
    clearRegisterErrors();
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
    const { registerErrors } = this.props;

    return (
      <div className="auth-page">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="9" lg="7" xl="6">
              <h3 className="auth-page__title">Join Us</h3>

              <div className="auth-form-card">
                <h1 className="auth-form-card__title">Create your account</h1>

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
                  {registerErrors ? (
                    <FormErrors errors={registerErrors} />
                  ) : null}
                  <Button variant="primary" type="submit" block>
                    Create account
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registerIsSuccessfull: state.auth.registerIsSuccessfull,
  registerErrors: state.auth.registerErrors
});

const mapDispatchToProps = dispatch => ({
  register: (username, email, password1, password2) =>
    dispatch(register(username, email, password1, password2)),
  clearRegisterErrors: () => dispatch(clearRegisterErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
