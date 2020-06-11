import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getTodoLists } from "../actions";

export class TodoListsActionBarItem extends React.Component {
  static propTypes = {
    getTodoLists: PropTypes.func.isRequired,
    todoLists: PropTypes.array
  };

  static defaultProps = {
    todoLists: null
  };

  componentDidMount() {
    const { getTodoLists } = this.props;
    getTodoLists();
  }

  render() {
    const { todoLists } = this.props;
    if (!todoLists) return null;

    return (
      <ListGroup className="todo-lists-action-bar-item">
        {todoLists.map(todoList => (
          <ListGroup.Item
            as={Link}
            to={`/todo-list/${todoList.id}`}
            href={todoList.id}
            key={todoList.id}
            variant="dark"
            action
          >
            <strong>{todoList.title}</strong>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  todoLists: state.todo.todoLists
});

const mapDispatchToProps = dispatch => ({
  getTodoLists: () => dispatch(getTodoLists())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListsActionBarItem);
