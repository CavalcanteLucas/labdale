import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { deleteTodoList } from "../actions";

export class DeleteTodoListModal extends React.Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    deleteTodoList: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    })
  };

  static defaultProps = {
    history: undefined
  };

  handleCloseModal = () => {
    const { onHide } = this.props;
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { history, todoList, deleteTodoList } = this.props;
    deleteTodoList(todoList.id);
    history.push("/dashboard");
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
  editTodoListTitleErrors: state.todo.editTodoListTitleErrors,
  editTodoListTitleSuccessMessage: state.todo.editTodoListTitleSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  deleteTodoList: todoListId => dispatch(deleteTodoList(todoListId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTodoListModal));
