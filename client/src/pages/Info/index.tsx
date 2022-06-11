import * as React from 'react';
import './Info.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Info = () => (
  <div className="info-page" data-testid="info-page">
    <h1>MERN G-Pup</h1>
    <p>
      Go to <a href="/">/</a> to view data.
    </p>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Server</Card.Title>
              <ul>
                <li>node</li>
                <li>mongodb</li>
                <li>typescript</li>
                <li>expressjs</li>
                <li>eslint & prettier</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Client</Card.Title>
              <ul>
                <li>React 17</li>
                <li>typescript</li>
                <li>Bootstrap</li>
                <li>SASS</li>
                <li>eslint & prettier</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Info;
