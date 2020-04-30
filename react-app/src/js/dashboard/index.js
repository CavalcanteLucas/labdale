import React from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTodos, getUserInfo } from "./actions";

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
      <div id="dashboard" style={{ height: "100vh" }}>
        {userInfo ? (
          <Container>
            <h3>Hi {userInfo.username}</h3>
            <p>Today is TODAY</p>
            {todos ? (
              <Card body>
                <ListGroup variant="flush">
                  {todos.map(todo => (
                    <ListGroup.Item key={todo.id}>
                      <p>
                        <strong>{todo.title}</strong> ({todo.id})
                      </p>
                      <small>{todo.created_at}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            ) : null}
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todos,
  userInfo: state.userInfo.userInfo
});

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos()),
  getUserInfo: () => dispatch(getUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
