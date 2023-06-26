import React from 'react'

import { Card, Badge, Button, ListGroup } from "react-bootstrap";
const TestsInfo = () => {
  return (
    <div>
      <Card>
        <Card.Header>
          <h5>
            Passed 0 tests out of 10{" "}
            <span className="text-muted small">
              (3 public tests and 7 hidden)
            </span>
          </h5>
        </Card.Header>
        <Card.Body>
          <ListGroup as="ol" numbered>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Expected:</div>
                Output:
              </div>
              <Badge bg="primary" pill>
                -
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Expected:</div>
                Output:
              </div>
              <Badge bg="primary" pill>
                -
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Expected:</div>
                Output:
              </div>
              <Badge bg="primary" pill>
                -
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TestsInfo