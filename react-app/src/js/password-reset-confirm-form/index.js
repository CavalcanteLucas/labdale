import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { passwordResetConfirm } from "./actions";
import FormErrors from "../FormErrors";

export class PasswordResetConfirmForm extends React.Component {
  state = {
    password1: "",
    password2: ""
  };

  static propTypes = {
    passwordResetConfirm: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    errors: PropTypes.object,
    match: PropTypes.object.isRequired
  };

  static defaultProps = {
    history: null,
    successMessage: null,
    errors: null
  };

  componentDidUpdate() {
    const { successMessage, history } = this.props;

    if (successMessage) {
      history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { password1, password2 } = this.state;
    const { match } = this.props;
    const { uid, token } = match.params;
    const { passwordResetConfirm } = this.props;
    passwordResetConfirm(uid, token, password1, password2);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { password1, password2 } = this.state;
    const { errors } = this.props;

    return (
      <div id="form-box">
        <Container>
          <div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="form-password1">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  name="password1"
                  required
                  type="password"
                  placeholder=""
                  value={password1}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="form-password2">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  name="password2"
                  required
                  type="password"
                  placeholder=""
                  value={password2}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              {errors ? <FormErrors errors={errors} /> : null}
              <Button variant="success" type="submit" block>
                {" "}
                Change password
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.passwordResetConfirm.successMessage,
  errors: state.passwordResetConfirm.errors
});

const mapDispatchToProps = dispatch => ({
  passwordResetConfirm: (uid, token, password1, password2) =>
    dispatch(passwordResetConfirm(uid, token, password1, password2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetConfirmForm);
