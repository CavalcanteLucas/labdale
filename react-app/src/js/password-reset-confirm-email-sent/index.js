import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export default class PasswordResetConfirmEmailSent extends React.Component {
  render() {
    return (
      <div id="form-box">
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="form-wrapper">
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
