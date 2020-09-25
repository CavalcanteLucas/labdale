import React from "react";
import { Button, ListGroup, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import pencilBtn from "../../../img/pencil-btn.png";
import garbageBtn from "../../../img/garbage-btn.png";

import EditTodoModal from "./EditTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
import { editTodo } from "../actions";

export class TodoDetail extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // eslint-disable-next-line camelcase
    const { is_done } = props.todo;

    this.state = {
      editTodoModalIsOpen: false,
      deleteTodoModalIsOpen: false,
      isDone: is_done
    };
  }

  openEditTodoModal = () => this.setState({ editTodoModalIsOpen: true });

  openDeleteTodoModal = () => this.setState({ deleteTodoModalIsOpen: true });

  closeEditTodoModal = () => this.setState({ editTodoModalIsOpen: false });

  closeDeleteTodoModal = () => this.setState({ deleteTodoModalIsOpen: false });

  toogleChecked = () => {
    const { isDone } = this.state;
    const { todo, editTodo } = this.props;
    editTodo(todo.todo_list, todo.id, { is_done: !isDone });
    this.setState({ isDone: !isDone });
  };

  render() {
    const { editTodoModalIsOpen, deleteTodoModalIsOpen, isDone } = this.state;
    const { todo } = this.props;
    return (
      <ListGroup.Item>
        <div>
          <Form inline>
            <Form.Check
              name="isDone"
              type="checkbox"
              defaultChecked={isDone}
              onChange={this.toogleChecked}
            />
            <strong style={{ "margin-left": "1em" }}>{todo.title}</strong> (
            {todo.id}) - {moment(todo.deadline).format("YYYY-MM-DD")}
            <Button variant="no-style" onClick={this.openEditTodoModal}>
              <img
                src={pencilBtn}
                alt="Edit Todo"
                className="todo-detail__edit-btn"
              />
            </Button>
            <EditTodoModal
              show={editTodoModalIsOpen}
              onHide={this.closeEditTodoModal}
              todo={todo}
            />
            <Button variant="no-style" onClick={this.openDeleteTodoModal}>
              <img
                src={garbageBtn}
                alt="Delete Todo List"
                className="todo-detail__delete-btn"
              />
            </Button>
            <DeleteTodoModal
              show={deleteTodoModalIsOpen}
              onHide={this.closeDeleteTodoModal}
              todo={todo}
            />
          </Form>
        </div>
      </ListGroup.Item>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editTodo: (todoListId, todoId, args) =>
    dispatch(editTodo(todoListId, todoId, args))
});

export default connect(null, mapDispatchToProps)(TodoDetail);
