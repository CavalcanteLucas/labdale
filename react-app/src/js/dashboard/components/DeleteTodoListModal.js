import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { deleteTodoList } from "../actions";
import { setSuccessMessage } from "../../messager/actions";

export class DeleteTodoListModal extends React.Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    deleteTodoList: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    deleteTodoListIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    history: undefined,
    deleteTodoListIsSuccessfull: null
  };

  componentDidUpdate(prevProps) {
    const { history, deleteTodoListIsSuccessfull } = this.props;
    if (deleteTodoListIsSuccessfull && !prevProps.deleteTodoListIsSuccessfull) {
      this.handleCloseModal();
      history.push("/dashboard");
    }
  }

  handleCloseModal = () => {
    const { onHide } = this.props;
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { todoList, deleteTodoList } = this.props;
    deleteTodoList(todoList.id);
  };

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Todo List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Todo List permanently?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.todo.successMessage,
  deleteTodoListIsSuccessfull: state.todo.deleteTodoListIsSuccessfull
});

const mapDispatchToProps = dispatch => ({
  deleteTodoList: todoListId => dispatch(deleteTodoList(todoListId)),
  setSuccessMessage: successMessage =>
    dispatch(setSuccessMessage(successMessage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTodoListModal));
