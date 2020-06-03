import React from "react";
import { Nav } from "react-bootstrap";

import AddTodoListActionItem from "./AddTodoListActionItem";
import TodoLists from "./TodoLists";

export default class ActionBar extends React.Component {
  render() {
    return (
      <Nav className="action-bar">
        <AddTodoListActionItem />
        <TodoLists />
      </Nav>
    );
  }
}
