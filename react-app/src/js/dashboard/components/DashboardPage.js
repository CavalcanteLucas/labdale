import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import ActionBar from "./ActionBar";
import Messager from "../../messager/Messager";

import { clearSuccessMessage } from "../../welcome/actions";

export class DashboardPage extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    successMessage: PropTypes.string,
    failureMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: undefined,
    successMessage: "",
    failureMessage: ""
  };

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  render() {
    const { successMessage, failureMessage, children } = this.props;
    return (
      <div className="dashboard">
        <Container fluid>
          <Row xs={4}>
            <Col>
              <ActionBar />
            </Col>

            <Col xs={{ offset: 1, span: 7 }}>
              {/* {failureMessage ? (
                <Alert variant="danger">{failureMessage}</Alert>
              ) : null}
              {successMessage ? (
                <Alert
                  variant="success"
                  onClose={this.handleCloseSuccessMessage}
                  dismissible
                >
                  {successMessage}
                </Alert>
              ) : null} */}
              <Messager />
              <div className="dashboard__content">{children}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.messager.successMessage,
  failureMessage: state.todo.failureMessage
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
