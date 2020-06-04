import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import pencilBtn from "../../../img/pencil-btn.png";

import EditTodoListTitleModal from "./EditTodoListTitleModal";

export class TodoListDetail extends React.Component {
  static propTypes = {
    todoListDetail: PropTypes.object
  };

  static defaultProps = {
    todoListDetail: null
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  closeModal = () => this.setState({ modalIsOpen: false });

  openModal = () => this.setState({ modalIsOpen: true });

  render() {
    const { modalIsOpen } = this.state;
    const { todoListDetail } = this.props;

    return (
      <div className="todo-list-detail">
        {todoListDetail ? (
          <div>
            <h1>
              <strong>{todoListDetail.title}</strong>&nbsp;(id:&nbsp;
              {todoListDetail.id})&nbsp;(owner:&nbsp;{todoListDetail.owner}
              )&nbsp;
              <Button variant="no-style" onClick={this.openModal}>
                <img
                  src={pencilBtn}
                  alt="Edit Todo"
                  className="todo-list-detail__edit-btn"
                />
              </Button>
              <EditTodoListTitleModal
                show={modalIsOpen}
                onHide={this.closeModal}
                todoList={todoListDetail}
              />
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
