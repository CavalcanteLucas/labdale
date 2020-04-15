import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearRegisterSuccessMessage } from "../todo_auth/actions";

export class Welcome extends React.Component {
  static propTypes = {
    fetchWelcomeMessage: PropTypes.func,
    successMessage: PropTypes.string,
    clearRegisterSuccessMessage: PropTypes.func
  };

  static defaultProps = {
    successMessage: null,
    fetchWelcomeMessage: () => {},
    clearRegisterSuccessMessage: () => {}
  };

  componentDidMount() {
    const {
      fetchWelcomeMessage,
      clearRegisterSuccessMessage,
      successMessage
    } = this.props;

    fetchWelcomeMessage();
    if (successMessage) {
      setTimeout(clearRegisterSuccessMessage, 2000);
    }
  }

  render() {
    const { successMessage } = this.props;

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
              </div>
              {successMessage ? (
                <div className="alert alert-success" role="alert">
                  {successMessage}
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
  successMessage: state.todoAuth.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearRegisterSuccessMessage: () => dispatch(clearRegisterSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
