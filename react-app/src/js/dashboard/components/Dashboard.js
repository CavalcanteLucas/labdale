import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { capitalize as _capitalize } from "lodash";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

import TodoLists from "./TodoLists";
import ActionBar from "./ActionBar";
import { getUserInfo } from "../../auth/actions";

import { clearCreateTodoListSuccessMessage } from "../actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    failureMessage: PropTypes.string,
    successMessage: PropTypes.string,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    userInfo: null,
    failureMessage: "",
    successMessage: ""
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
    const { userInfo, failureMessage, successMessage } = this.props;
    return (
      <div className="dashboard">
        {userInfo ? (
          <Container fluid>
            <Row>
              <Col xs={2} lg={1}>
                <ActionBar />
              </Col>
              <Col xs={10} lg={11}>
                {failureMessage ? (
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
                ) : null}
                <div className="dashboard__content">
                  <h3>
                    Hi <strong>{_capitalize(userInfo.username)}</strong>,
                  </h3>
                  <p>
                    Today is:
                    <strong> {moment().format("dddd, DD/MM/Y")}</strong>
                  </p>
                  <TodoLists />
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
  failureMessage: state.todo.getTodoListFailureMessage,
  successMessage: state.todo.createTodoListSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  clearSuccessMessage: () => dispatch(clearCreateTodoListSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
