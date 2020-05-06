import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearSuccessMessage } from "./actions";

export class Welcome extends React.Component {
  static propTypes = {
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    successMessage: null
  };

  componentWillUnmount = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  render() {
    const { successMessage } = this.props;

    return (
      <div id="welcome-body">
        <Helmet>
          <title>- To-Do LABC -</title>
        </Helmet>
        {successMessage ? (
          <div className="alert alert-success" role="alert">
            {successMessage}
            <button
              onClick={this.handleCloseSuccessMessage}
              type="button"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.successMessage.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
