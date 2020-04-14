import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearRegisterSuccessMessage } from "../todo_auth/actions";

export class Welcome extends React.Component {
  static propTypes = {
    fetchWelcomeMessage: PropTypes.func,
    successMessage: PropTypes.string,
    clearRegisterSuccessMessage: PropTypes.func
  };

  static defaultProps = {
    successMessage: null,
    fetchWelcomeMessage: () => {},
    clearRegisterSuccessMessage: () => {}
  };

  componentDidMount() {
    const {
      fetchWelcomeMessage,
      clearRegisterSuccessMessage,
      successMessage
    } = this.props;

    fetchWelcomeMessage();
    if (successMessage) {
      setTimeout(clearRegisterSuccessMessage, 2000);
    }
  }

  render() {
    const { successMessage } = this.props;

    return (
      <div id="welcome">
        <Helmet>
          <title>- To-Do LABC -</title>
        </Helmet>

        <h1>Welcome to the To-Do LABC App!</h1>

        {successMessage ? (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        ) : null}

        <p>This is a Django-React App for managing To-Do activities.</p>
        <p>
          Not a user yet? <Link to="/register">Create a login</Link>.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.todoAuth.successMessage
});

const mapDispatchToProps = dispatch => ({
  clearRegisterSuccessMessage: () => dispatch(clearRegisterSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
