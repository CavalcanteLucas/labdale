import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

import { createTodoList, clearCreateTodoListErrors } from "../actions";
import FormErrors from "../../FormErrors";

export class AddTodoListModal extends React.Component {
  static propTypes = {
    createTodoList: PropTypes.func.isRequired,
    errors: PropTypes.object,
    clearCreateTodoListErrors: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    successMessage: PropTypes.string
  };

  static defaultProps = {
    errors: null,
    successMessage: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      todoListTitle: ""
    };
  }

  componentDidUpdate(prevProps) {
    const { successMessage } = this.props;
    if (successMessage && !prevProps.successMessage) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    const { clearCreateTodoListErrors, onHide } = this.props;
    this.setState({ todoListTitle: "" });
    clearCreateTodoListErrors();
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { todoListTitle } = this.state;
    const { createTodoList } = this.props;
    createTodoList(todoListTitle);
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ todoListTitle: value });
  };

  render() {
    const { todoListTitle } = this.state;
    const { show, errors } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create To-Do List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="form-todo-list-title">
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                name="todoListTitle"
                required
                type="text"
                placeholder="Insert title"
                value={todoListTitle}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            {errors ? <FormErrors errors={errors} /> : null}
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
  errors: state.todo.createTodoListErrors,
  successMessage: state.todo.createTodoListSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  createTodoList: todoListTitle => dispatch(createTodoList(todoListTitle)),
  clearCreateTodoListErrors: () => dispatch(clearCreateTodoListErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoListModal);
