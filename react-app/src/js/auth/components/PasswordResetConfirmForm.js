import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  passwordResetConfirm,
  clearPasswordResetConfirmErrors
} from "../actions";
import FormErrors from "../../FormErrors";

export class PasswordResetConfirmForm extends React.Component {
  state = {
    password1: "",
    password2: ""
  };

  static propTypes = {
    passwordResetConfirm: PropTypes.func.isRequired,
    history: PropTypes.object,
    passwordResetConfirmIsSuccessfull: PropTypes.bool,
    passwordResetConfirmErrors: PropTypes.object,
    match: PropTypes.object.isRequired,
    clearPasswordResetConfirmErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    history: null,
    passwordResetConfirmIsSuccessfull: null,
    passwordResetConfirmErrors: null
  };

  componentDidUpdate(prevProps) {
    const { passwordResetConfirmIsSuccessfull, history } = this.props;

    if (
      passwordResetConfirmIsSuccessfull &&
      !prevProps.passwordResetConfirmIsSuccessfull
    ) {
      history.push("/");
    }
  }

  componentWillUnmount() {
    const { clearPasswordResetConfirmErrors } = this.props;
    clearPasswordResetConfirmErrors();
  }

  onSubmit = e => {
    e.preventDefault();
    const { password1, password2 } = this.state;
    const { match } = this.props;
    const { uid, token } = match.params;
    const { passwordResetConfirm } = this.props;
    passwordResetConfirm(uid, token, password1, password2);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { password1, password2 } = this.state;
    const { passwordResetConfirmErrors } = this.props;

    return (
      <div className="auth-page">
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="auth-form-card">
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="form-password1">
                    <Form.Label>New password</Form.Label>
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
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control
                      name="password2"
                      required
                      type="password"
                      placeholder=""
                      value={password2}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {passwordResetConfirmErrors ? (
                    <FormErrors errors={passwordResetConfirmErrors} />
                  ) : null}
                  <Button variant="success" type="submit" block>
                    Change password
                  </Button>
                  <small>
                    Make sure it is at least 15 characters OR at least 8
                    characters including a number and a lowercase letter.
                  </small>
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
  passwordResetConfirmIsSuccessfull:
    state.auth.passwordResetConfirmIsSuccessfull,
  passwordResetConfirmErrors: state.auth.passwordResetConfirmErrors
});

const mapDispatchToProps = dispatch => ({
  passwordResetConfirm: (uid, token, password1, password2) =>
    dispatch(passwordResetConfirm(uid, token, password1, password2)),
  clearPasswordResetConfirmErrors: () =>
    dispatch(clearPasswordResetConfirmErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetConfirmForm);
