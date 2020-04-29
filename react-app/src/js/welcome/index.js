import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginForm from "../login-form";
import { clearSuccessMessage } from "./actions";

export class Welcome extends React.Component {
  static propTypes = {
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired,
    history: PropTypes.object
  };

  static defaultProps = {
    history: null,
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
    const { successMessage, history } = this.props;

    return (
      // <div className="body-main" style={{ height: "100vh" }}>
      <div id="welcome-body" style={{ height: "100vh" }}>
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
            <Col
              xs={{ span: 10, offset: 1 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5, offset: 1 }}
              xl={{ span: 4, offset: 2 }}
            >
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
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="login-box">
                <LoginForm history={history}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      // </div>
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
