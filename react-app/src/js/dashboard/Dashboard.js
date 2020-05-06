import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { capitalize as _capitalize } from "lodash";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import TodoList from "./TodoList";
import { getUserInfo } from "../auth/actions";

export class Dashboard extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  };

  static defaultProps = {
    userInfo: null
  };

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="dashboard" style={{ height: "100vh" }}>
        {userInfo ? (
          <Container>
            <div className="dashboard__content">
              <h3>
                Hi <strong>{_capitalize(userInfo.username)}</strong>,
              </h3>
              <p>
                today is: <strong>{moment().format("dddd, DD/MM/Y")}</strong>
              </p>
              <TodoList />
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
