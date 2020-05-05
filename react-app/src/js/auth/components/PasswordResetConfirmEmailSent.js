import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

export default class PasswordResetConfirmEmailSent extends React.Component {
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
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" block>
                    Return to sign in
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
