import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Helmet from "react-helmet";

import LoginForm from "../auth/components/LoginForm";
import Messager from "../messager/Messager";

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <Helmet>
          <title>- LABDALE -</title>
        </Helmet>

        <Messager />

        <div className="welcome__content">
          <Container>
            <Row>
              <Col
                xs={{ span: 12, offset: 0 }}
                md={{ span: 6, offset: 0 }}
                lg={{ span: 5, offset: 1 }}
                xl={{ span: 4, offset: 2 }}
              >
                <h1 className="welcome__title">Welcome to LABDALE!</h1>

                <p className="welcome__message">
                  This is a Django-React App for managing To-Do activities. Join
                  for free!
                </p>
              </Col>
              <Col
                xs={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 0 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
              >
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
