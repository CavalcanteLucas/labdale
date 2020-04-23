import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearRegisterSuccessMessage } from "../register-form/actions";
import { clearPasswordResetSuccessMessage } from "../password-reset-form/actions";

export class Welcome extends React.Component {
  static propTypes = {
    successRegisterMessage: PropTypes.string,
    successPasswordResetMessage: PropTypes.string,
    clearRegisterSuccessMessage: PropTypes.func,
    clearPasswordResetSuccessMessage: PropTypes.func
  };

  static defaultProps = {
    successRegisterMessage: null,
    successPasswordResetMessage: null,
    clearRegisterSuccessMessage: () => {},
    clearPasswordResetSuccessMessage: () => {}
  };

  componentDidMount() {
    const {
      clearRegisterSuccessMessage,
      clearPasswordResetSuccessMessage,
      successRegisterMessage,
      successPasswordResetMessage
    } = this.props;

    if (successRegisterMessage) {
      setTimeout(clearRegisterSuccessMessage, 2000);
    }

    if (successPasswordResetMessage) {
      setTimeout(clearPasswordResetSuccessMessage, 4000);
    }
  }

  render() {
    const { successRegisterMessage, successPasswordResetMessage } = this.props;

    return (
      <div id="welcome-body">
        <Helmet>
          <title>- To-Do LABC -</title>
        </Helmet>
        <Container className="welcome-body-wrapper">
          <Row>
            <Col>
              <div className="welcome-wrapper">
                <h1 className="welcome-title">
                  Welcome to the To-Do LABC App!
                </h1>

                <div className="welcome-message-wrapper">
                  <p className="welcome-message">
                    This is a Django-React App for managing To-Do activities.
                  </p>
                </div>
              </div>
            </Col>

            <Col>
              <div className="login-box">
                <p>This will become some login form.</p>
                <p>
                  Not a user yet? <Link to="/register">Create a login</Link>.
                </p>
                <p>
                  <Link to="/password_reset">Forgot password?</Link>
                </p>
              </div>
              {successRegisterMessage ? (
                <div className="alert alert-success" role="alert">
                  {successRegisterMessage}
                </div>
              ) : null}
              {successPasswordResetMessage ? (
                <div className="alert alert-success" role="alert">
                  {successPasswordResetMessage}
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successRegisterMessage: state.register.successMessage,
  successPasswordResetMessage: state.passwordReset.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearRegisterSuccessMessage: () => dispatch(clearRegisterSuccessMessage()),
  clearPasswordResetSuccessMessage: () =>
    dispatch(clearPasswordResetSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
