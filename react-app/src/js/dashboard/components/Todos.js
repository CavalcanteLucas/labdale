import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import { getTodos } from "../actions";

export class Todos extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
    todoList: PropTypes.number.isRequired,
    todos: PropTypes.array
  };

  static defaultProps = {
    todos: null
  };

  componentDidMount() {
    const { todoList, getTodos } = this.props;
    getTodos(todoList.id);
  }

  render() {
    const { todos } = this.props;
    if (!todos) return null;

    return (
      <ListGroup variant="flush">
        {todos.map(todo => (
          <ListGroup.Item key={todo.id} action>
            <strong>{todo.title}</strong>
          </ListGroup.Item>
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
