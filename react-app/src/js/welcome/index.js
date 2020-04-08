import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWelcomeMessage } from "./actions";

export class Welcome extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    fetchWelcomeMessage: PropTypes.func
  };

  static defaultProps = {
    message: null,
    fetchWelcomeMessage: () => {}
  };

  componentDidMount() {
    const { fetchWelcomeMessage } = this.props;
    fetchWelcomeMessage();
  }

  render() {
    const { message } = this.props;

    return (
      <div id="welcome">
        <Helmet>
          <title>ToDo-LabC App - Welcome!</title>
        </Helmet>

        <h1>Welcome to the ToDo-LabC App!</h1>
        <p>This is a Django-React App for managing To-Do activities.</p>
        {message ? <p className="message">{message}</p> : null}
        <p>
          This is a work in poggress.
          <Link to="/sample-nested-page/"> See more</Link>.
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ welcome }) => ({ message: welcome.message });

const mapDispatchToProps = dispatch => ({
  fetchWelcomeMessage: () => dispatch(fetchWelcomeMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
