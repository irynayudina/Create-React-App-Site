import React, {useState} from 'react'
import { Card, Badge, Button, ListGroup } from "react-bootstrap";
import ChallengeDiscussionSection from './ChallengeDiscussionSection';
const ChallengeInfo = ({ data }) => {
  const [expandedComments, setExpandedComments] = useState(false)
  return (
    <div>
      <Card>
        <Card.Header>
          <h3 className="d-flex justify-content-between align-items-start">
            <div>{data.name} </div>
            <Badge bg="secondary" className="float-right">
              0:51
            </Badge>
          </h3>
          <Badge variant="success">{data.difficulty}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {data.author} • {data.creationDate}
          </Card.Subtitle>
          <Card.Text>{data.description}</Card.Text>
          <Card.Subtitle className="mb-2">Topic: {data.topic}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Tags:</Card.Subtitle>
          <ListGroup horizontal className='d-flex flex-wrap'>
            {data.tags.map((tag, index) => (
              <ListGroup.Item size="sm" key={index}>
                {tag}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />
          <Card.Title className="text-center">Test examples</Card.Title>
          {data.examples.map((example, index) => (
            <div key={index}>
              <h5>example {index + 1}:</h5>
              <Card.Text>
                Input: {example.input}
                <br />
                Expected output: {example.output}
              </Card.Text>
            </div>
          ))}
        </Card.Body>
        <Card.Footer className="gap-3">
          <div className='d-flex justify-content-between'>
            <div>
              <small className="text-muted">Points: 0/{data.points} </small>
              <small
                className="text-muted cursor-pointer"
                onClick={() => setExpandedComments(!expandedComments)}
              >
                {" "}
                • Discussion: {data.discussionCount}{" "}
              </small>
            </div>
            <Button variant="primary" size="sm">
              Submit Challenge
            </Button>
          </div>
        </Card.Footer>
        {expandedComments ? <ChallengeDiscussionSection /> : ""}
      </Card>
    </div>
  );
}

export default ChallengeInfo