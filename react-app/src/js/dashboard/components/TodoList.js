import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import { getTodoLists } from "../actions";

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
        <p>This space will contain some info about a Todo List.</p>
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
