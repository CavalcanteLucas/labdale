import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import { getTodos } from "../actions";

import TodoDetail from "./TodoDetail";

export class Todos extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
    todoListId: PropTypes.number.isRequired,
    todos: PropTypes.array
  };

  static defaultProps = {
    todos: []
  };

  componentDidMount() {
    const { todoListId, getTodos } = this.props;
    getTodos(todoListId);
  }

  render() {
    const { todos } = this.props;

    return (
      <ListGroup variant="flush">
        {todos.map(todo => (
          <TodoDetail todo={todo} key={`Todo: ${todo.id}`} />
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todos
});

const mapDispatchToProps = dispatch => ({
  getTodos: todoListId => {
    dispatch(getTodos(todoListId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
