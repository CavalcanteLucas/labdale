import React from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { capitalize as _capitalize } from "lodash";

import { getTodos } from "./actions";
import { getUserInfo } from "../auth/actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    todos: PropTypes.array,
    userInfo: PropTypes.object
  };

  static defaultProps = {
    todos: null,
    userInfo: null
  };

  componentDidMount() {
    const { getTodos, getUserInfo } = this.props;
    getTodos();
    getUserInfo();
  }

  render() {
    const { todos, userInfo } = this.props;
    return (
      <div id="dashboard-body" style={{ height: "100vh" }}>
        {userInfo ? (
          <Container className="dashboard-body-wrapper">
            <h3>
              Hi <strong>{_capitalize(userInfo.username)}</strong>,
            </h3>
            <p>
              today is: <strong>{moment().format("dddd, DD/MM/Y")}</strong>
            </p>
            {todos ? (
              <div className="dashboard-wrapper">
                <Card body>
                  <ListGroup variant="flush">
                    {todos.map(todo => (
                      <ListGroup.Item key={todo.id}>
                        <p>
                          <strong>{todo.title}</strong> ({todo.id})
                        </p>
                        <small>
                          {moment(todo.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </div>
            ) : null}
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todos,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos()),
  getUserInfo: () => dispatch(getUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
