import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";

import { editTodo, clearEditTodoErrors } from "../actions";
import FormErrors from "../../FormErrors";

export class EditTodoModal extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    editTodoErrors: PropTypes.object,
    clearEditTodoErrors: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    editTodoIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    editTodoErrors: null,
    editTodoIsSuccessfull: null
  };

  constructor(props) {
    super(props);
    const { title, deadline } = props.todo;

    this.state = {
      newTitle: title,
      newDeadline: moment(deadline).format("YYYY-MM-DD")
    };
  }

  componentDidUpdate(prevProps) {
    const { editTodoIsSuccessfull } = this.props;
    if (editTodoIsSuccessfull && !prevProps.editTodoIsSuccessfull) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    const { clearEditTodoErrors, onHide } = this.props;
    clearEditTodoErrors();
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { newTitle, newDeadline } = this.state;
    const { todo, editTodo } = this.props;
    editTodo(todo.todo_list, todo.id, newTitle, newDeadline);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { newTitle, newDeadline } = this.state;
    const { show, editTodoErrors } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="form-todo">
              <Form.Label>
                <strong>New Title</strong>
              </Form.Label>
              <Form.Control
                name="newTitle"
                required
                type="text"
                value={newTitle}
                onChange={this.handleInputChange}
              />
              <br />
              <Form.Label>
                <strong>New Deadline</strong>
              </Form.Label>
              <Form.Control
                name="newDeadline"
                required
                type="date"
                value={newDeadline}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            {editTodoErrors ? <FormErrors errors={editTodoErrors} /> : null}
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
  editTodoErrors: state.todo.editTodoErrors,
  editTodoIsSuccessfull: state.todo.editTodoIsSuccessfull
});

const mapDispatchToProps = dispatch => ({
  editTodo: (todoListId, todoId, newTitle, newDeadline) =>
    dispatch(editTodo(todoListId, todoId, newTitle, newDeadline)),
  clearEditTodoErrors: () => dispatch(clearEditTodoErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoModal);
