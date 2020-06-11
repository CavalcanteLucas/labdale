import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import pencilBtn from "../../../img/pencil-btn.png";
import garbageBtn from "../../../img/garbage-btn.png";

import EditTodoListTitleModal from "./EditTodoListTitleModal";
import { getTodoList, deleteTodoList } from "../actions";

import DashboardPage from "./DashboardPage";

export class TodoListDetail extends React.Component {
  static propTypes = {
    todoListDetail: PropTypes.object,
    deleteTodoList: PropTypes.func.isRequired,
    getTodoList: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    todoListDetail: null
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
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

  closeModal = () => this.setState({ modalIsOpen: false });

  openModal = () => this.setState({ modalIsOpen: true });

  handleDelete = () => {
    const { match, deleteTodoList } = this.props;
    deleteTodoList(match.params.id);
  };

  render() {
    const { modalIsOpen } = this.state;
    const { todoListDetail } = this.props;
    return (
      <DashboardPage>
        <div className="todo-list-detail">
          {todoListDetail ? (
            <Fragment>
              <h1>
                <strong>{todoListDetail.title}</strong>
                <Button variant="no-style" onClick={this.openModal}>
                  <img
                    src={pencilBtn}
                    alt="Edit Todo List"
                    className="todo-list-detail__edit-btn"
                  />
                </Button>
                <Button variant="no-style" onClick={this.handleDelete}>
                  <img
                    src={garbageBtn}
                    alt="Delete Todo List"
                    className="todo-list-detail__delete-btn"
                  />
                </Button>
                <EditTodoListTitleModal
                  show={modalIsOpen}
                  onHide={this.closeModal}
                  todoList={todoListDetail}
                />
              </h1>
              <p>
                <strong>Created: </strong>
                {moment(todoListDetail.created_at).format("dddd, DD/MM/Y")}
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
  deleteTodoList: todoListId => dispatch(deleteTodoList(todoListId)),
  getTodoList: todoListId => {
    dispatch(getTodoList(todoListId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDetail);
