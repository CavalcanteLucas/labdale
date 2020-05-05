import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class PublicRoute extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
  };

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...props} />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(PublicRoute));
