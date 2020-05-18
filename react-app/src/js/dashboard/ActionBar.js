import React from "react";
import { Nav } from "react-bootstrap";

import plusBtn from "../../img/plus-btn.png";

export default class ActionBar extends React.Component {
  render() {
    return (
      <Nav
        className="action-bar flex-column"
        activeKey="/"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item className="action-bar__item">
          <Nav.Link href="/">
            <img src={plusBtn} alt="Add Todo" className="action-bar__add-btn" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
