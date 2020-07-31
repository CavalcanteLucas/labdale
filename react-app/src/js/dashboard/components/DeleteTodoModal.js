import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { deleteTodo } from "../actions";

export class DeleteTodoModal extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    deleteTodoIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    deleteTodoIsSuccessfull: null
  };

  componentDidUpdate(prevProps) {
    const { deleteTodoIsSuccessfull } = this.props;

    if (deleteTodoIsSuccessfull && !prevProps.deleteTodoIsSuccessfull) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    const { onHide } = this.props;
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.todo_list, todo.id);
  };

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Todo permanently?
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
  deleteTodoIsSuccessfull: state.todo.deleteTodoIsSuccessfull
});

const mapDispatchToProps = dispatch => ({
  deleteTodo: (todoListId, todoId) => dispatch(deleteTodo(todoListId, todoId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTodoModal));
