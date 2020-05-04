import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class PasswordResetConfirmEmailSent extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  static defaultProps = {
    history: null,
    isAuthenticated: null
  };

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }

  render() {
    return (
      <div id="password-reset-body" style={{ height: "100vh" }}>
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="form-box">
                <h4>Reset your password</h4>
                <p>
                  Check your email for a link to reset your password. If it
                  doesn’t appear within a few minutes, check your spam folder.
                </p>
                <Button href="/" variant="secondary" block>
                  Return to sign in
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, null)(PasswordResetConfirmEmailSent);
