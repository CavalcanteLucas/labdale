import React from "react";
import { Alert, Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearSuccessMessage_temp } from "./actions";
import LoginForm from "../auth/components/LoginForm";

export class Welcome extends React.Component {
  static propTypes = {
    clearSuccessMessage_temp: PropTypes.func.isRequired,
    messageList: PropTypes.array
  };

  static defaultProps = {
    messageList: []
  };

  handleCloseMessage_temp = index => {
    const { clearSuccessMessage_temp } = this.props;
    clearSuccessMessage_temp(index);
  };

  render() {
    const { messageList } = this.props;
    return (
      <div className="welcome">
        <Helmet>
          <title>- LABDALE -</title>
        </Helmet>

        {messageList.map((message, index) => (
          <Alert
            variant="success"
            onClose={() => this.handleCloseMessage_temp(index)}
            dismissible
            key={index}
          >
            messageList({index}): {message}
          </Alert>
        ))}

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
  registerSuccessMessage: state.messager.registerSuccessMessage,
  messageList: state.messager.messageList
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage_temp: index => dispatch(clearSuccessMessage_temp(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
