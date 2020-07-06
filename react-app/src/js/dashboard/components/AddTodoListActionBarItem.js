import React from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import plusBtn from "../../../img/plus-btn.png";
import AddTodoListModal from "./AddTodoListModal";
import { clearSuccessMessage } from "../actions";

export class AddTodoListActionBarItem extends React.Component {
  static propTypes = {
    clearSuccessMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  closeModal = () => this.setState({ modalIsOpen: false });

  openModal = () => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage();
    this.setState({ modalIsOpen: true });
  };

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

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(null, mapDispatchToProps)(AddTodoListActionBarItem);
