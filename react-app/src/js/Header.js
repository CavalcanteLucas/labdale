import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <Link to="/">
        <h1>To-Do LABC</h1>
      </Link>
    );
  }
}
