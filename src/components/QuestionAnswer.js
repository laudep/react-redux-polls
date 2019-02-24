import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import { connect } from "react-redux";
import { handleQuestionAnswer } from "../actions/shared";

class QuestionAnswer extends Component {
  state = {
    selection: null,
    submitDisabled: true
  };

  handleAnswerClick = function(answer) {
    const { dispatch, authedUser, question } = this.props;
    dispatch(handleQuestionAnswer(authedUser, question.id, answer));
  };

  handleChange = value => {
    this.setState({
      selection: value,
      submitDisabled: false
    });
  };

  getAnswerOptions = () => {
    const { question } = this.props;
    return (
      <ButtonToolbar>
        <ToggleButtonGroup
          vertical
          type="radio"
          name="answer"
          onChange={this.handleChange}
        >
          <ToggleButton value="optionOne" variant="outline-dark">
            {question.optionOne.text}
          </ToggleButton>
          <br />
          <ToggleButton value="optionTwo" variant="outline-dark">
            {question.optionTwo.text}
          </ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    );
  };

  render() {
    const { author } = this.props;
    return (
      <Card className="question">
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
            <Col xs={9}>
              <h5>Would you rather...</h5>
              {this.getAnswerOptions()}
              <Card.Footer className="text-center">
                <Button
                  disabled={this.state.submitDisabled}
                  variant="dark"
                  onClick={event =>
                    this.handleAnswerClick(this.state.selection)
                  }
                >
                  Submit
                </Button>
              </Card.Footer>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(QuestionAnswer);
