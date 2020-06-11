import React from "react";
import { Nav } from "react-bootstrap";

import plusBtn from "../../../img/plus-btn.png";

import AddTodoListModal from "./AddTodoListModal";

export default class AddTodoListActionBarItem extends React.Component {
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

    return (
      <Nav.Item className="add-todo-list-action-bar-item">
        <Nav.Link onClick={this.openModal}>
          <img
            src={plusBtn}
            alt="Add Todo"
            className="add-todo-list-action-bar-item__btn"
          />
        </Nav.Link>
        <AddTodoListModal show={modalIsOpen} onHide={this.closeModal} />
      </Nav.Item>
    );
  }
}
