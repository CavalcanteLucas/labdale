import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";

import { getTodoLists } from "./actions";

export class TodoLists extends React.Component {
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
      <div className="todo-list">
        <Card body>
          <ListGroup variant="flush">
            {todoLists.map(todoList => (
              <ListGroup.Item key={todoList.id}>
                <p>
                  <strong>{todoList.title}</strong> ({todoList.id})
                </p>
                <small>
                  {moment(todoList.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoLists: state.todo.todoLists
});

const mapDispatchToProps = dispatch => ({
  getTodoLists: () => dispatch(getTodoLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
