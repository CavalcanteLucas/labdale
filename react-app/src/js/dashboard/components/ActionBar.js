import React from "react";
import { Nav } from "react-bootstrap";

import AddTodoListActionItem from "./AddTodoListActionItem";

export default class ActionBar extends React.Component {
  render() {
    return (
      <Nav>
        <AddTodoListActionItem />
      </Nav>
    );
  }
}
