import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";

import { getTodoLists } from "./actions";

export class TodoLists extends React.Component {
  static propTypes = {
    getTodoLists: PropTypes.func.isRequired,
    todos: PropTypes.array
  };

  static defaultProps = {
    todos: null
  };

  componentDidMount() {
    const { getTodoLists } = this.props;
    getTodoLists();
  }

  // componentDidUpdate() {
  //   const { getTodos } = this.props;
  //   getTodos();
  // }

  render() {
    const { todos } = this.props;
    if (!todos) return null;

    return (
      <div className="todo-list">
        <Card body>
          <ListGroup variant="flush">
            {todos.map(todo => (
              <ListGroup.Item key={todo.id}>
                <p>
                  <strong>{todo.title}</strong> ({todo.id})
                </p>
                <small>
                  {moment(todo.created_at).format("MMMM Do YYYY, h:mm:ss a")}
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
  todos: state.todo.todos
});

const mapDispatchToProps = dispatch => ({
  getTodoLists: () => dispatch(getTodoLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
