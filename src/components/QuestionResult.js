import React from "react";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Badge,
  ProgressBar
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const QuestionResult = ({ author, ...rest }) => {
  return (
    <Card className="question-result">
      <Card.Body>
        <Card.Header as="h5">Asked by {author.name}</Card.Header>

        <Row>
          <Col xs={3}>
            <div className="container d-flex h-100">
              <Image
                roundedCircle
                className="question-avatar row justify-content-center align-self-center"
                src={author.avatarURL}
                fluid
              />
            </div>
          </Col>
          <Col xs={9}>{resultsListGroup({ ...rest })}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const resultsListGroup = ({ question, optOne, optTwo }) => {
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const votedBadge = (
    <Badge variant="dark">
      <FaStar /> Your vote
    </Badge>
  );

  const VoteCountBadge = ({ count }) => (
    <div className="vote-summary">
      <Badge pill variant="secondary">
        {count} out of {totalVotes} votes
      </Badge>
    </div>
  );

  const OptionResult = ({ voted, option }) => {
    return (
      <ListGroupItem variant={voted ? "secondary" : ""}>
        {voted ? votedBadge : null}
        <p>Would you rather {option.text}</p>
        <ProgressBar
          variant="dark"
          now={(option.votes.length / totalVotes) * 100}
        />
        <VoteCountBadge count={option.votes.length} />
      </ListGroupItem>
    );
  };

  return (
    <ListGroup>
      <OptionResult option={question.optionOne} voted={optOne} />
      <OptionResult option={question.optionTwo} voted={optTwo} />
    </ListGroup>
  );
};

export default QuestionResult;
