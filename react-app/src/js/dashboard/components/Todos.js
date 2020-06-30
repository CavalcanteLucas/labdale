import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { isEmpty as _isEmpty } from "lodash";

import plusBtn from "../../../img/plus-btn.png";
import { getTodos } from "../actions";
import AddTodoModal from "./AddTodoModal";

export class Todos extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
    todoListId: PropTypes.number.isRequired,
    todos: PropTypes.array
  };

  static defaultProps = {
    todos: null
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  componentDidMount() {
    const { todoListId, getTodos } = this.props;
    getTodos(todoListId);
  }

  closeModal = () => this.setState({ modalIsOpen: false });

  openModal = () => this.setState({ modalIsOpen: true });

  render() {
    const { modalIsOpen } = this.state;
    const { todoListId, todos } = this.props;

    return (
      <>
        {!_isEmpty(todos) ? (
          <ListGroup variant="flush">
            {todos.map(todo => (
              <ListGroup.Item key={`a${todo.id}`} action>
                <p>
                  <strong>{todo.title} - </strong>
                  <strong>{todo.id}</strong>
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : null}
        <br />
        <Button variant="dark" onClick={this.openModal}>
          <img src={plusBtn} alt="Add Todo" className="todos__add-btn" />
        </Button>
        <AddTodoModal
          show={modalIsOpen}
          onHide={this.closeModal}
          todoListId={todoListId}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todos
});

const mapDispatchToProps = dispatch => ({
  getTodos: todoListId => {
    dispatch(getTodos(todoListId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
