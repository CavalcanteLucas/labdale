import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  isEmpty as _isEmpty,
  capitalize as _capitalize,
  join as _join
} from "lodash";

class RegisterFormErrors extends React.Component {
  static propTypes = {
    errors: PropTypes.shape({
      username: PropTypes.arrayOf(PropTypes.string),
      password: PropTypes.arrayOf(PropTypes.string)
    })
  };

  static defaultProps = {
    errors: null
  };

  render() {
    const { errors } = this.props;

    if (_isEmpty(errors)) return null;

    return (
      <ul className="register-form-errors alert alert-danger">
        {Object.entries(errors).map(([fieldLabel, fieldErrors]) => (
          <li key={fieldLabel}>
            {_capitalize(fieldLabel)}: {_join(fieldErrors, " ")}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.todoAuth.errors
});

export default connect(mapStateToProps)(RegisterFormErrors);
