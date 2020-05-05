import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  passwordReset,
  clearPasswordResetFailureMessage,
  clearPasswordResetSuccessMessage
} from "./actions";
import FormErrors from "../FormErrors";

export class PasswordResetForm extends React.Component {
  state = {
    email: ""
  };

  static propTypes = {
    passwordReset: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    errors: PropTypes.object,
    clearPasswordResetFailureMessage: PropTypes.func.isRequired,
    clearPasswordResetSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    history: null,
    successMessage: null,
    errors: null
  };

  componentDidMount() {
    const { clearPasswordResetSuccessMessage } = this.props;
    clearPasswordResetSuccessMessage();
  }

  componentDidUpdate() {
    const { successMessage, history } = this.props;
    if (successMessage) {
      history.push("/password_reset/confirm");
    }
  }

  componentWillUnmount() {
    const { clearPasswordResetFailureMessage } = this.props;
    clearPasswordResetFailureMessage();
  }

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const { passwordReset } = this.props;
    passwordReset(email);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email } = this.state;
    const { errors } = this.props;

    return (
      <div id="password-reset-body" style={{ height: "100vh" }}>
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="form-box">
                <h4>Reset your password</h4>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="form-email">
                    <Form.Label>
                      Enter your user account`s verified email address and we
                      will send you a password reset link.
                    </Form.Label>
                    <Form.Control
                      name="email"
                      required
                      type="text"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {errors ? <FormErrors errors={errors} /> : null}
                  <Button variant="success" type="submit" block>
                    Send password reset email
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
  successMessage: state.passwordReset.successMessage,
  errors: state.passwordReset.errors
});

const mapDispatchToProps = dispatch => ({
  passwordReset: email => dispatch(passwordReset(email)),
  clearPasswordResetFailureMessage: () =>
    dispatch(clearPasswordResetFailureMessage()),
  clearPasswordResetSuccessMessage: () =>
    dispatch(clearPasswordResetSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
