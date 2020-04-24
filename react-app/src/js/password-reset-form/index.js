import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { passwordReset } from "./actions";
import FormErrors from "../FormErrors";

export class PasswordResetForm extends React.Component {
  state = {
    email: ""
  };

  static propTypes = {
    passwordReset: PropTypes.func.isRequired,
    history: PropTypes.object,
    successMessage: PropTypes.string,
    errors: PropTypes.object
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
    const { email } = this.state;
    const { passwordReset } = this.props;
    passwordReset(email);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email } = this.state;
    const { errors } = this.props;

    return (
      <div id="form-box">
        <Container>
          <div className="form-wrapper">
            <h4>Reset your password</h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="form-email">
                <Form.Label>
                  Enter your user account`s verified email address and we will
                  send you a password reset link.
                </Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="text"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              {errors ? <FormErrors errors={errors} /> : null}
              <Button variant="success" type="submit" block>
                {" "}
                Send password reset email
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.passwordReset.successMessage,
  errors: state.passwordReset.errors
});

const mapDispatchToProps = dispatch => ({
  passwordReset: email => dispatch(passwordReset(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
