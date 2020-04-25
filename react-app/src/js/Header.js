import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Header extends React.Component {
  render() {
    return (
      <div className="app-header-wrapper">
        <Link to="/">
          <img
            src="https://image.flaticon.com/icons/png/512/54/54441.png"
            alt="Logomark"
            className="logo"
          />
        </Link>
        <Button href="/register" variant="outline-light">
          Sign Up
        </Button>
      </div>
    );
  }
}
