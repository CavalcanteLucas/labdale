import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTodos } from "./actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
    todos: PropTypes.array
  };

  static defaultProps = {
    todos: null
  };

  componentDidMount() {
    const { getTodos } = this.props;
    getTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <div id="dashboard" style={{ height: "100vh" }}>
        <Container>
          <h1>Welcome, {localStorage.token}</h1>
          <h4>It`s good to have you back.</h4>
          {todos ? (
            <ListGroup>
              {todos.map(todo => (
                <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : null}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todos
});

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
