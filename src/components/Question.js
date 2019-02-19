import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/questions";

class Question extends Component {
  handleAnswerClick = function(chosenOption) {
    const { answerQuestion, authedUser, question } = this.props;
    answerQuestion(
      authedUser,
      question.id,
      chosenOption === 1 ? "optionOne" : "optionTwo"
    );
  };

  render() {
    const { authedUser, question, users } = this.props;
    const questionAnswered =
      Object.keys(users[authedUser].answers).indexOf(question.id) > -1
        ? true
        : false;
    const voteCountOptionOne = question.optionOne.votes.length,
      voteCountOptionTwo = question.optionTwo.votes.length;
    const voteCountTotal = voteCountOptionOne + voteCountOptionTwo;

    return (
      //TODO show question statistics
      //TODO handle question link
      <Link to={`/questions/${question.id}`} className="question">
        <img
          src={`/${users[question.author].avatarURL}`}
          alt={`Avatar for user ${question.author}`}
          className="avatar"
        />
        <div className="option">
          <button onClick={event => this.handleAnswerClick(1)}>
            {question.optionOne.text}
          </button>
        </div>
        <div>
          <button onClick={event => this.handleAnswerClick(2)}>
            {question.optionTwo.text}
          </button>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  actions
)(Question);
