import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { isEmpty as _isEmpty } from "lodash";

import { getTodos } from "../actions";

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

    return !_isEmpty(todos) ? (
      <ListGroup variant="flush">
        {todos.map(todo => (
          <ListGroup.Item key={`a${todo.id}`} action>
            <p>
              <strong>{todo.title} - </strong>
              <strong>{todo.id}</strong>
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : null;
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
