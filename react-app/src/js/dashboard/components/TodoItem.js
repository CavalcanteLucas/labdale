import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import moment from "moment";

import pencilBtn from "../../../img/pencil-btn.png";

import EditTodoModal from "./EditTodoModal";

export default class TodoItem extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editTodoModalIsOpen: false
    };
  }

  openEditTodoModal = () => {
    this.setState({ editTodoModalIsOpen: true });
  };

  closeEditTodoModal = () => this.setState({ editTodoModalIsOpen: false });

  render() {
    const { editTodoModalIsOpen } = this.state;
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
        </div>
      </ListGroup.Item>
    );
  }
}
