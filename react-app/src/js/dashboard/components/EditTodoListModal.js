import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { editTodoList, clearEditTodoListErrors } from "../actions";
import { setSuccessMessage } from "../../messager/actions";
import FormErrors from "../../FormErrors";

export class EditTodoListModal extends React.Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    editTodoList: PropTypes.func.isRequired,
    editTodoListErrors: PropTypes.object,
    clearEditTodoListErrors: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    editTodoListIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    editTodoListErrors: null,
    editTodoListIsSuccessfull: null
  };

  constructor(props) {
    super(props);

    this.state = {
      newTitle: ""
    };
  }

  componentDidUpdate(prevProps) {
    const { editTodoListIsSuccessfull } = this.props;
    if (editTodoListIsSuccessfull && !prevProps.editTodoListIsSuccessfull) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    const { clearEditTodoListErrors, onHide } = this.props;
    this.setState({ newTitle: "" });
    clearEditTodoListErrors();
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { newTitle } = this.state;
    const { todoList, editTodoList } = this.props;
    editTodoList(todoList.id, newTitle);
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ newTitle: value });
  };

  render() {
    const { newTitle } = this.state;
    const { show, editTodoListErrors, todoList } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="form-todo-list-title">
              <Form.Label>
                <strong>Insert new title</strong>
              </Form.Label>
              <Form.Control
                name="newTitle"
                required
                type="text"
                placeholder={todoList.title}
                value={newTitle}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            {editTodoListErrors ? (
              <FormErrors errors={editTodoListErrors} />
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  editTodoListErrors: state.todo.editTodoListErrors,
  successMessage: state.todo.successMessage,
  editTodoListIsSuccessfull: state.todo.editTodoListIsSuccessfull
});

const mapDispatchToProps = dispatch => ({
  editTodoList: (todoListId, newTitle) =>
    dispatch(editTodoList(todoListId, newTitle)),
  clearEditTodoListErrors: () => dispatch(clearEditTodoListErrors()),
  setSuccessMessage: successMessage =>
    dispatch(setSuccessMessage(successMessage))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoListModal);
