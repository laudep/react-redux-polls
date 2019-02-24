import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Badge
} from "react-bootstrap";

class Leaderboard extends Component {
  renderAuthorStats = (author, index) => (
    <Card key={author.id} bsStyle="primary">
      <Card.Header as="h5">
        <Badge variant="secondary" className="position">
          {index + 1}
        </Badge>
        <Badge pill variant="light" className="author">
          {author.name}
        </Badge>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col xs={3}>
            <Image rounded className="avatar" src={author.avatarURL} />
          </Col>
          <Col xs={5}>
            <ListGroup className="stats">
              <ListGroupItem>
                <span>{Object.keys(author.answers).length}</span>
                Answered Questions
              </ListGroupItem>
              <ListGroupItem>
                <span>{author.questions.length}</span>
                Created Questions
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={4}>
            <Card className="score">
              <Card.Title className="scoreHeader">Score</Card.Title>
              <Card.Body>
                <p>
                  {Object.keys(author.answers).length + author.questions.length}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  render() {
    return (
      <div className="leaderboard">
        {this.props.sortedAuthors.map((author, index) =>
          this.renderAuthorStats(author, index)
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const sortedAuthors = Object.values(users).sort((a, b) => {
    const rankOne = Object.keys(a.answers).length + a.questions.length;
    const rankTwo = Object.keys(b.answers).length + b.questions.length;
    return rankTwo - rankOne;
  });
  return {
    authedUser,
    sortedAuthors: sortedAuthors
  };
}

export default connect(mapStateToProps)(Leaderboard);
