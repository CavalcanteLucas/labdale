import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import { getTodoLists, getTodoList } from "../actions";

export class TodoLists extends React.Component {
  static propTypes = {
    getTodoLists: PropTypes.func.isRequired,
    getTodoList: PropTypes.func.isRequired,
    todoLists: PropTypes.array
  };

  static defaultProps = {
    todoLists: null
  };

  componentDidMount() {
    const { getTodoLists } = this.props;
    getTodoLists();
  }

  handleSelect = eventKey => {
    const { getTodoList } = this.props;
    getTodoList(eventKey);
  };

  render() {
    const { todoLists } = this.props;
    if (!todoLists) return null;

    return (
      <div className="todo-list">
        <ListGroup variant="flush" onSelect={this.handleSelect}>
          {todoLists.map(todoList => (
            <ListGroup.Item
              action
              variant="dark"
              key={todoList.id}
              eventKey={todoList.id}
            >
              <strong>{todoList.title}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoLists: state.todo.todoLists
});

const mapDispatchToProps = dispatch => ({
  getTodoLists: () => dispatch(getTodoLists()),
  getTodoList: todoListId => dispatch(getTodoList(todoListId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
