import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

import ActionBar from "./ActionBar";
import Messager from "../../messager/Messager";

export default class DashboardPage extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  static defaultProps = {
    children: undefined
  };

  render() {
    const { children } = this.props;
    return (
      <div className="dashboard">
        <Container fluid>
          <Row xs={4}>
            <Col>
              <ActionBar />
            </Col>

            <Col xs={{ offset: 1, span: 7 }}>
              <Messager />
              <div className="dashboard__content">{children}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
