import React from "react";
import { Alert, Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginForm from "../auth/components/LoginForm";
import { clearSuccessMessage, clearRegisterSuccessMessage } from "./actions";

export class Welcome extends React.Component {
  static propTypes = {
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired,
    registerSuccessMessage: PropTypes.string,
    clearRegisterSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    successMessage: null,
    registerSuccessMessage: null
  };

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage, clearRegisterSuccessMessage } = this.props;
    clearSuccessMessage();
    clearRegisterSuccessMessage();
  };

  render() {
    const { successMessage, registerSuccessMessage } = this.props;

    return (
      <div className="welcome">
        <Helmet>
          <title>- LABDALE -</title>
        </Helmet>
        {successMessage ? (
          <Alert
            variant="success"
            onClose={this.handleCloseSuccessMessage}
            dismissible
          >
            successMessage: {successMessage}
          </Alert>
        ) : null}
        {registerSuccessMessage ? (
          <Alert
            variant="success"
            onClose={this.handleCloseSuccessMessage}
            dismissible
          >
            registerSuccessMessage: {registerSuccessMessage}
          </Alert>
        ) : null}
        <div className="welcome__content">
          <Container>
            <Row>
              <Col
                xs={{ span: 12, offset: 0 }}
                md={{ span: 6, offset: 0 }}
                lg={{ span: 5, offset: 1 }}
                xl={{ span: 4, offset: 2 }}
              >
                <h1 className="welcome__title">Welcome to LABDALE!</h1>

                <p className="welcome__message">
                  This is a Django-React App for managing To-Do activities. Join
                  for free!
                </p>
              </Col>
              <Col
                xs={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 0 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
              >
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.messager.successMessage,
  registerSuccessMessage: state.messager.registerSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: () => dispatch(clearSuccessMessage()),
  clearRegisterSuccessMessage: () => dispatch(clearRegisterSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
