import React from "react";
import PropTypes from "prop-types";
import {
  isEmpty as _isEmpty,
  capitalize as _capitalize,
  join as _join
} from "lodash";

export default class FormErrors extends React.Component {
  static propTypes = {
    errors: PropTypes.object
  };

  static defaultProps = {
    errors: null
  };

  render() {
    const { errors } = this.props;
    if (_isEmpty(errors)) return null;

    return (
      <ul className="auth-form-card__errors alert alert-danger">
        {Object.entries(errors).map(([fieldLabel, fieldErrors]) => (
          <li key={fieldLabel}>
            {_capitalize(fieldLabel)}: {_join(fieldErrors, " ")}
          </li>
        ))}
      </ul>
    );
  }
}
