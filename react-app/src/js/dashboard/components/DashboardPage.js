import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

import ActionBar from "./ActionBar";

import {
  clearCreateTodoListSuccessMessage,
  clearEditTodoListTitleSuccessMessage,
  clearDeleteTodoListSuccessMessage,
  clearSuccessMessage
} from "../actions";

export class DashboardPage extends React.Component {
  static propTypes = {
    getTodoListsFailureMessage: PropTypes.string,
    getTodoListFailureMessage: PropTypes.string,
    createTodoListSuccessMessage: PropTypes.string,
    clearCreateTodoListSuccessMessage: PropTypes.func.isRequired,
    editTodoListTitleSuccessMessage: PropTypes.string,
    clearEditTodoListTitleSuccessMessage: PropTypes.func.isRequired,
    deleteTodoListSuccessMessage: PropTypes.string,
    clearDeleteTodoListSuccessMessage: PropTypes.func.isRequired,
    deleteTodoListFailureMessage: PropTypes.string,
    children: PropTypes.object,
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    getTodoListsFailureMessage: "",
    getTodoListFailureMessage: "",
    createTodoListSuccessMessage: "",
    editTodoListTitleSuccessMessage: "",
    deleteTodoListSuccessMessage: "",
    deleteTodoListFailureMessage: "",
    children: undefined,
    successMessage: ""
  };

  handleCloseCreateTodoListSuccessMessage = () => {
    const { clearCreateTodoListSuccessMessage } = this.props;
    clearCreateTodoListSuccessMessage();
  };

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  handleCloseEditTodoListTitleSuccessMessage = () => {
    const { clearEditTodoListTitleSuccessMessage } = this.props;
    clearEditTodoListTitleSuccessMessage();
  };

  handleCloseDeleteTodoListSuccessMessage = () => {
    const { clearDeleteTodoListSuccessMessage } = this.props;
    clearDeleteTodoListSuccessMessage();
  };

  render() {
    const {
      getTodoListsFailureMessage,
      getTodoListFailureMessage,
      successMessage,
      createTodoListSuccessMessage,
      editTodoListTitleSuccessMessage,
      deleteTodoListSuccessMessage,
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
              {createTodoListSuccessMessage ? (
                <Alert
                  variant="success"
                  onClose={this.handleCloseCreateTodoListSuccessMessage}
                  dismissible
                >
                  {createTodoListSuccessMessage}
                </Alert>
              ) : null}
              {editTodoListTitleSuccessMessage ? (
                <Alert
                  variant="success"
                  onClose={this.handleCloseEditTodoListTitleSuccessMessage}
                  dismissible
                >
                  {editTodoListTitleSuccessMessage}
                </Alert>
              ) : null}
              {deleteTodoListSuccessMessage ? (
                <Alert
                  variant="success"
                  onClose={this.handleCloseDeleteTodoListSuccessMessage}
                  dismissible
                >
                  {deleteTodoListSuccessMessage}
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
  createTodoListSuccessMessage: state.todo.createTodoListSuccessMessage,
  editTodoListTitleSuccessMessage: state.todo.editTodoListTitleSuccessMessage,
  deleteTodoListSuccessMessage: state.todo.deleteTodoListSuccessMessage,
  deleteTodoListFailureMessage: state.todo.deleteTodoListFailureMessage,
  successMessage: state.todo.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearCreateTodoListSuccessMessage: () =>
    dispatch(clearCreateTodoListSuccessMessage()),
  clearEditTodoListTitleSuccessMessage: () =>
    dispatch(clearEditTodoListTitleSuccessMessage()),
  clearDeleteTodoListSuccessMessage: () =>
    dispatch(clearDeleteTodoListSuccessMessage()),
  clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
