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

const QuestionResult = props => {
  const { author } = props;
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
          <Col xs={9}>{resultsListGroup(props)}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const resultsListGroup = props => {
  const { question, optOne, optTwo } = props;
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const votedBadge = (
    <Badge variant="dark">
      <FaStar /> Your vote
    </Badge>
  );

  const VoteCountBadge = props => (
    <div className="vote-summary">
      <Badge pill variant="secondary">
        {props.count} out of {totalVotes} votes
      </Badge>
    </div>
  );

  const OptionResult = props => {
    return (
      <ListGroupItem variant={props.voted ? "secondary" : ""}>
        {props.voted ? votedBadge : null}
        <p>Would you rather {props.option.text}</p>
        <ProgressBar variant="dark" now={(props.option.votes.length / totalVotes) * 100} />
        <VoteCountBadge count={props.option.votes.length} />
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
