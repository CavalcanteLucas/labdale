import React from "react";
import { Nav } from "react-bootstrap";

import plusBtn from "../../../img/plus-btn.png";

import AddTodoListModal from "./AddTodoListModal";

export default class AddTodoListActionItem extends React.Component {
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
      <Nav.Item className="action-bar__item">
        <Nav.Link onClick={this.openModal}>
          <img src={plusBtn} alt="Add Todo" className="action-bar__add-btn" />
        </Nav.Link>
        <AddTodoListModal show={modalIsOpen} onHide={this.closeModal} />
      </Nav.Item>
    );
  }
}
