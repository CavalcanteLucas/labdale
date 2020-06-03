import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { capitalize as _capitalize } from "lodash";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

import TodoList from "./TodoList";
import ActionBar from "./ActionBar";
import { getUserInfo } from "../../auth/actions";

import { clearCreateTodoListSuccessMessage } from "../actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    getTodoListFailureMessage: PropTypes.string,
    createTodoListSuccessMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    userInfo: null,
    getTodoListFailureMessage: "",
    createTodoListSuccessMessage: ""
  };

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  handleCloseSuccessMessage = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
  };

  render() {
    const {
      userInfo,
      getTodoListFailureMessage,
      createTodoListSuccessMessage
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
                <div className="dashboard__content">
                  <h3>
                    Hi <strong>{_capitalize(userInfo.username)}</strong>,
                  </h3>
                  <p>
                    Today is:
                    <strong> {moment().format("dddd, DD/MM/Y")}</strong>
                  </p>
                  <TodoList />
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
  getTodoListFailureMessage: state.todo.getTodoListFailureMessage,
  createTodoListSuccessMessage: state.todo.createTodoListSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  clearSuccessMessage: () => dispatch(clearCreateTodoListSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
