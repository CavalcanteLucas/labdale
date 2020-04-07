import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

export default class SampleNestedPage extends React.Component {
  render() {
    return (
      <div id="sample-nested-page">
        <Helmet>
          <title>ToDo-LabC App</title>
        </Helmet>

        <h1>Welcome to our App!</h1>
        <p>It will become a great app soon.</p>
        <p>Very soon.</p>
        <p>Please, have a great day.</p>
        <p>
          <Link to="/">Back to home.</Link>
        </p>
      </div>
    );
  }
}
