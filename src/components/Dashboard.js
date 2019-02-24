import React, { Component, Fragment } from "react";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  CardColumns
} from "react-bootstrap";
import { connect } from "react-redux";
import QuestionPreview from "./QuestionPreview";
class Dashboard extends Component {
  state = {
    showAnswered: false
  };

  showAnswered(showAnswered) {
    this.setState({
      showAnswered: showAnswered
    });
  }

  getAnswerFilterButton = showAnswered => {
    return (
      <ToggleButton
        title={`Show ${showAnswered ? "answered" : "unanswered"} questions`}
        variant="outline-dark"
        onClick={event => this.showAnswered(showAnswered)}
        value={showAnswered}
      >
        {showAnswered ? "Answered" : "Unanswered"}
      </ToggleButton>
    );
  };

  render() {
    const { showAnswered } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray =
      questions && Object.keys(questions).map(key => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const wasAnswered =
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1;
      return showAnswered ? wasAnswered : !wasAnswered;
    });
    const sortedQuestions = filteredQuestions.sort(
      (a, b) => b.timestamp - a.timestamp
    );

    return (
      <Fragment>
        <ButtonToolbar style={{ marginTop: "1em", marginBottom: "1em" }}>
          <ToggleButtonGroup type="radio" name="questions" defaultValue={false}>
            {this.getAnswerFilterButton(false)}
            {this.getAnswerFilterButton(true)}
          </ToggleButtonGroup>
        </ButtonToolbar>
        <CardColumns>
          {sortedQuestions.map(question => (
            <QuestionPreview
              key={question.id}
              question={question}
              wasAnswered={showAnswered}
            />
          ))}
        </CardColumns>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  };
}

export default connect(mapStateToProps)(Dashboard);
