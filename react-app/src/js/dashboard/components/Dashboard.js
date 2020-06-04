import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

import TodoListDetail from "./TodoListDetail";
import ActionBar from "./ActionBar";
import { getUserInfo } from "../../auth/actions";

import {
  clearCreateTodoListSuccessMessage,
  clearEditTodoListTitleSuccessMessage
} from "../actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    getTodoListsFailureMessage: PropTypes.string,
    getTodoListFailureMessage: PropTypes.string,
    createTodoListSuccessMessage: PropTypes.string,
    clearCreateTodoListSuccessMessage: PropTypes.func.isRequired,
    editTodoListTitleSuccessMessage: PropTypes.string,
    clearEditTodoListTitleSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    userInfo: null,
    getTodoListsFailureMessage: "",
    getTodoListFailureMessage: "",
    createTodoListSuccessMessage: "",
    editTodoListTitleSuccessMessage: ""
  };

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  handleCloseSuccessMessage = () => {
    const {
      clearCreateTodoListSuccessMessage,
      clearEditTodoListTitleSuccessMessage
    } = this.props;
    clearCreateTodoListSuccessMessage();
    clearEditTodoListTitleSuccessMessage();
  };

  render() {
    const {
      userInfo,
      getTodoListsFailureMessage,
      getTodoListFailureMessage,
      createTodoListSuccessMessage,
      editTodoListTitleSuccessMessage
    } = this.props;

    return (
      <div className="dashboard">
        {userInfo ? (
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
                {createTodoListSuccessMessage ? (
                  <Alert
                    variant="success"
                    onClose={this.handleCloseSuccessMessage}
                    dismissible
                  >
                    {createTodoListSuccessMessage}
                  </Alert>
                ) : null}
                {editTodoListTitleSuccessMessage ? (
                  <Alert
                    variant="success"
                    onClose={this.handleCloseSuccessMessage}
                    dismissible
                  >
                    {editTodoListTitleSuccessMessage}
                  </Alert>
                ) : null}
                <div className="dashboard__content">
                  <TodoListDetail />
                </div>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  getTodoListsFailureMessage: state.todo.getTodoListsFailureMessage,
  getTodoListFailureMessage: state.todo.getTodoListFailureMessage,
  createTodoListSuccessMessage: state.todo.createTodoListSuccessMessage,
  editTodoListTitleSuccessMessage: state.todo.editTodoListTitleSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  clearCreateTodoListSuccessMessage: () =>
    dispatch(clearCreateTodoListSuccessMessage()),
  clearEditTodoListTitleSuccessMessage: () =>
    dispatch(clearEditTodoListTitleSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
