import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { editTodoListTitle, clearCreateTodoListErrors } from "../actions";
import FormErrors from "../../FormErrors";

export class EditTodoListTitleModal extends React.Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    editTodoListTitle: PropTypes.func.isRequired,
    createTodoListErrors: PropTypes.object,
    clearCreateTodoListErrors: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    editTodoListTitleSuccessMessage: PropTypes.string
  };

  static defaultProps = {
    createTodoListErrors: null,
    editTodoListTitleSuccessMessage: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      newTitle: ""
    };
  }

  componentDidUpdate(prevProps) {
    const { editTodoListTitleSuccessMessage } = this.props;
    if (
      editTodoListTitleSuccessMessage &&
      !prevProps.editTodoListTitleSuccessMessage
    ) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    const { clearCreateTodoListErrors, onHide } = this.props;
    this.setState({ newTitle: "" });
    clearCreateTodoListErrors();
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { newTitle } = this.state;
    const { todoList, editTodoListTitle } = this.props;
    editTodoListTitle(todoList.id, newTitle);
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ newTitle: value });
  };

  render() {
    const { newTitle } = this.state;
    const { show, createTodoListErrors, todoList } = this.props;

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
            {createTodoListErrors ? (
              <FormErrors errors={createTodoListErrors} />
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
  createTodoListErrors: state.todo.createTodoListErrors,
  editTodoListTitleSuccessMessage: state.todo.editTodoListTitleSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  editTodoListTitle: (todoListId, newTitle) =>
    dispatch(editTodoListTitle(todoListId, newTitle)),
  clearCreateTodoListErrors: () => dispatch(clearCreateTodoListErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodoListTitleModal);
