import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <Helmet>
          <title>- To-Do LABC -</title>
        </Helmet>

        <h1>Welcome to the To-Do LABC App!</h1>
        <p>This is a Django-React App for managing To-Do activities.</p>
        <p>
          Not a user yet? <Link to="/register">Create a login</Link>.
        </p>
      </div>
    );
  }
}
