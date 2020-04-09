import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <Helmet>
          <title>ToDo-LabC App - Welcome!</title>
        </Helmet>

        <h1>Welcome to the ToDo-LabC App!</h1>
        <p>This is a Django-React App for managing To-Do activities.</p>
        <p>
          This is a work in progress.
          <Link to="/sample-nested-page/"> See more</Link>.
        </p>
      </div>
    );
  }
}
