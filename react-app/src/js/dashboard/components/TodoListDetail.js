import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import pencilBtn from "../../../img/pencil-btn.png";
import garbageBtn from "../../../img/garbage-btn.png";

import EditTodoListModal from "./EditTodoListModal";
import DeleteTodoListModal from "./DeleteTodoListModal";
import { getTodoList } from "../actions";

import DashboardPage from "./DashboardPage";

export class TodoListDetail extends React.Component {
  static propTypes = {
    todoListDetail: PropTypes.object,
    getTodoList: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    todoListDetail: null,
    history: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      editModalIsOpen: false,
      deleteModalIsOpen: false
    };
  }

  componentDidMount() {
    const { match, getTodoList } = this.props;
    getTodoList(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match, location, getTodoList } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      getTodoList(match.params.id);
    }
  }

  closeEditModal = () => this.setState({ editModalIsOpen: false });

  closeDeleteModal = () => this.setState({ deleteModalIsOpen: false });

  openEditModal = () => this.setState({ editModalIsOpen: true });

  openDeleteModal = () => this.setState({ deleteModalIsOpen: true });

  render() {
    const { editModalIsOpen, deleteModalIsOpen } = this.state;
    const { todoListDetail } = this.props;
    return (
      <DashboardPage>
        <div className="todo-list-detail">
          {todoListDetail ? (
            <Fragment>
              <h1>
                <strong>{todoListDetail.title}</strong>
                <Button variant="no-style" onClick={this.openEditModal}>
                  <img
                    src={pencilBtn}
                    alt="Edit Todo List"
                    className="todo-list-detail__edit-btn"
                  />
                </Button>
                <Button variant="no-style" onClick={this.openDeleteModal}>
                  <img
                    src={garbageBtn}
                    alt="Delete Todo List"
                    className="todo-list-detail__delete-btn"
                  />
                </Button>
                <EditTodoListModal
                  show={editModalIsOpen}
                  onHide={this.closeEditModal}
                  todoList={todoListDetail}
                />
                <DeleteTodoListModal
                  show={deleteModalIsOpen}
                  onHide={this.closeDeleteModal}
                  todoList={todoListDetail}
                />
              </h1>
              <p>
                <br />(<strong>id</strong>:{todoListDetail.id}) (
                <strong>owner</strong>: {todoListDetail.owner})
              </p>
            </Fragment>
          ) : null}
        </div>
      </DashboardPage>
    );
  }
}

const mapStateToProps = state => ({
  todoListDetail: state.todo.todoListDetail
});

const mapDispatchToProps = dispatch => ({
  getTodoList: todoListId => {
    dispatch(getTodoList(todoListId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDetail);
