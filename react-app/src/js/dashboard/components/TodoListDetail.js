import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

export class TodoListDetail extends React.Component {
  static propTypes = {
    todoListDetail: PropTypes.object
  };

  static defaultProps = {
    todoListDetail: null
  };

  render() {
    const { todoListDetail } = this.props;

    return (
      <div className="todo-list">
        {todoListDetail ? (
          <div>
            <h1>
              <strong>{todoListDetail.title}</strong>&nbsp;(id:&nbsp;
              {todoListDetail.id})&nbsp;(owner:&nbsp;{todoListDetail.owner})
            </h1>
            <p>
              <strong>Created: </strong>
              {moment(todoListDetail.created_at).format("dddd, DD/MM/Y")}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoListDetail: state.todo.todoListDetail
});

export default connect(mapStateToProps, null)(TodoListDetail);
