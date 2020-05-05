import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout, getUserInfo } from "./auth/actions";

class Header extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  static defaultProps = {
    userInfo: null,
    isAuthenticated: null
  };

  componentDidMount() {
    const { getUserInfo, isAuthenticated } = this.props;
    if (isAuthenticated) {
      getUserInfo();
    }
  }

  render() {
    const { userInfo, logout } = this.props;

    return (
      <div className="app-header-wrapper">
        <Link to={userInfo ? "/dashboard" : "/"}>
          <img
            src="https://image.flaticon.com/icons/png/512/54/54441.png"
            alt="Logomark"
            className="logo"
          />
        </Link>
        {userInfo ? (
          <DropdownButton
            id="user-menu"
            title={userInfo.username}
            variant="dark"
          >
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link to="/register">
            <Button variant="outline-light">Sign Up</Button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
