import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import moment from "moment";

import pencilBtn from "../../../img/pencil-btn.png";
import garbageBtn from "../../../img/garbage-btn.png";

import EditTodoModal from "./EditTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";

export default class TodoDetail extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editTodoModalIsOpen: false,
      deleteTodoModalIsOpen: false
    };
  }

  openEditTodoModal = () => this.setState({ editTodoModalIsOpen: true });

  openDeleteTodoModal = () => this.setState({ deleteTodoModalIsOpen: true });

  closeEditTodoModal = () => this.setState({ editTodoModalIsOpen: false });

  closeDeleteTodoModal = () => this.setState({ deleteTodoModalIsOpen: false });

  render() {
    const { editTodoModalIsOpen, deleteTodoModalIsOpen } = this.state;
    const { todo } = this.props;
    return (
      <ListGroup.Item>
        <div>
          <strong>{todo.title}</strong> ({todo.id}) -{" "}
          {moment(todo.deadline).format("YYYY-MM-DD")}
          <Button variant="no-style" onClick={this.openEditTodoModal}>
            <img
              src={pencilBtn}
              alt="Edit Todo"
              className="todo-detail__edit-btn"
            />
          </Button>
          <EditTodoModal
            show={editTodoModalIsOpen}
            onHide={this.closeEditTodoModal}
            todo={todo}
          />
          <Button variant="no-style" onClick={this.openDeleteTodoModal}>
            <img
              src={garbageBtn}
              alt="Delete Todo List"
              className="todo-detail__delete-btn"
            />
          </Button>
          <DeleteTodoModal
            show={deleteTodoModalIsOpen}
            onHide={this.closeDeleteTodoModal}
            todo={todo}
          />
        </div>
      </ListGroup.Item>
    );
  }
}
