import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaPoll } from "react-icons/fa";

const QuestionPreview = (props) => {
  const { question, author, wasAnswered } = props;
  const questionUri = `/questions/${question.id}`;

  return (
    <Card className="question">
      <Card.Body>
        <Fragment>
          <Card.Header as="h5">
            {author.name} {wasAnswered ? "asked:" : "asks:"}
          </Card.Header>
          <Row>
            <Col xs={3}>
              <Image
                roundedCircle
                className="avatar question"
                src={author.avatarURL}
              />
            </Col>
            <Col>
              <span>Would you rather...</span>
            </Col>
          </Row>
        </Fragment>

        <Row className="justify-content-md-center">
          <ListGroup>
            <ListGroupItem>{question.optionOne.text}</ListGroupItem>
            <ListGroupItem>{question.optionTwo.text}</ListGroupItem>
          </ListGroup>
        </Row>
      </Card.Body>
      <Card.Footer className="text-center">
        <LinkContainer to={questionUri}>
          <Button variant="outline-dark">
            {wasAnswered ? <FaPoll /> : <FaEdit />} 
            {wasAnswered ? "View Results" : "Answer Poll"}
          </Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
};

function mapStateToProps({ users }, props) {
  const questionAuthor = props.question.author;
  return {
    author: users[questionAuthor]
  };
}

export default connect(mapStateToProps)(QuestionPreview);
