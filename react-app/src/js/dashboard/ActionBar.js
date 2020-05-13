import React from "react";
import { Nav } from "react-bootstrap";

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
            <img
              src="https://cdn.icon-icons.com/icons2/1350/PNG/512/plusbutton_87904.png"
              alt="Add Todo"
              className="action-bar__add-btn"
            />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
