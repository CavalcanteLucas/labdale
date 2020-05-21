import React from "react";
import { Nav, Button } from "react-bootstrap";

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
      <React.Fragment>
        <Nav className="action-bar flex-column" activeKey="/">
          <Nav.Item className="action-bar__item">
            <Nav.Link>
              <Button onClick={this.openModal}>
                <img
                  src={plusBtn}
                  alt="Add Todo"
                  className="action-bar__add-btn"
                />
              </Button>
              <AddTodoListModal show={modalIsOpen} onHide={this.closeModal} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </React.Fragment>
    );
  }
}
