import React from "react";
import { Nav } from "react-bootstrap";

import AddTodoListActionBarItem from "./AddTodoListActionBarItem";
import TodoListsActionBarItem from "./TodoListsActionBarItem";

export default class ActionBar extends React.Component {
  render() {
    return (
      <Nav className="action-bar">
        <AddTodoListActionBarItem />
        <TodoListsActionBarItem />
      </Nav>
    );
  }
}
