import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

import ActionBar from "./ActionBar";

import { clearSuccessMessage } from "../actions";

export class DashboardPage extends React.Component {
  static propTypes = {
    getTodoListsFailureMessage: PropTypes.string,
    getTodoListFailureMessage: PropTypes.string,
    deleteTodoListFailureMessage: PropTypes.string,
    children: PropTypes.object,
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    getTodoListsFailureMessage: "",
    getTodoListFailureMessage: "",
    deleteTodoListFailureMessage: "",
    children: undefined,
    successMessage: ""
  };

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  render() {
    const {
      getTodoListsFailureMessage,
      getTodoListFailureMessage,
      successMessage,
      deleteTodoListFailureMessage,
      children
    } = this.props;
    return (
      <div className="dashboard">
        <Container fluid>
          <Row xs={4}>
            <Col>
              <ActionBar />
            </Col>

            <Col xs={{ offset: 1, span: 7 }}>
              {getTodoListsFailureMessage ? (
                <Alert variant="danger">{getTodoListsFailureMessage}</Alert>
              ) : null}
              {getTodoListFailureMessage ? (
                <Alert variant="danger">{getTodoListFailureMessage}</Alert>
              ) : null}
              {deleteTodoListFailureMessage ? (
                <Alert variant="danger">{deleteTodoListFailureMessage}</Alert>
              ) : null}
              {successMessage ? (
                <Alert
                  variant="success"
                  onClose={this.handleCloseSuccessMessage}
                  dismissible
                >
                  successMessage: {successMessage}
                </Alert>
              ) : null}
              {/**/}
              <div className="dashboard__content">{children}</div>
              {/**/}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getTodoListsFailureMessage: state.todo.getTodoListsFailureMessage,
  getTodoListFailureMessage: state.todo.getTodoListFailureMessage,
  deleteTodoListFailureMessage: state.todo.deleteTodoListFailureMessage,
  successMessage: state.todo.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
