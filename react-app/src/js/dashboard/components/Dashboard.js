import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty as _isEmpty } from "lodash";
import { getTodoLists } from "../actions";

import DashboardPage from "./DashboardPage";

class Dashboard extends React.Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }),
    todoLists: PropTypes.array
  };

  static defaultProps = {
    history: undefined,
    todoLists: null
  };

  componentDidUpdate() {
    const { history, todoLists } = this.props;
    if (!_isEmpty(todoLists)) {
      history.push(`/todo-list/${todoLists[0].id}`);
    }
  }

  render() {
    const { todoLists } = this.props;
    return (
      <DashboardPage>
        {todoLists && _isEmpty(todoLists) ? (
          <h1>Hello, create some Todo Lists to start!</h1>
        ) : null}
      </DashboardPage>
    );
  }
}

const mapStateToProps = state => ({
  todoLists: state.todo.todoLists
});

const mapDispatchToProps = dispatch => ({
  getTodoLists: () => dispatch(getTodoLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
