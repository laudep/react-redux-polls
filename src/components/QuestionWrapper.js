import React from "react";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import QuestionAnswer from "./QuestionAnswer";
import QuestionResult from "./QuestionResult";
import NotFound from "./NotFound";

/**
 * Wrapper component for viewing or answering individual polls
 */
const QuestionWrapper = ({
  loggedIn,
  question,
  author,
  optOneChosen,
  optTwoChosen,
  notFound
}) => {
  /**
   * Displays the poll in answer mode
   */
  const displayPollToAnswer = () => (
    <QuestionAnswer question={question} author={author} />
  );

  /**
   * Displays the poll's voting result
   */
  const displayPollResult = () => (
    <QuestionResult
      question={question}
      author={author}
      optOne={optOneChosen}
      optTwo={optTwoChosen}
    />
  );

  /**
   * Displays an alert for invalid polls
   */
  const invalidPoll = () => {
    if (!loggedIn) return <Redirect to="/" />;
    return <NotFound />;
  };

  /**
   * Displays either the result or answer view of the poll
   */
  const displayPoll = () =>
    optOneChosen || optTwoChosen ? displayPollResult() : displayPollToAnswer();

  return <Card>{notFound ? invalidPoll() : displayPoll()}</Card>;
};

function mapStateToProps({ users, questions, authedUser }, props) {
  if (!authedUser) return { loggedIn: false };
  const question = questions[props.match.params.question_id];
  if (!question) return { notFound: true };
  const author = users[question.author];
  const optOneChosen = question.optionOne.votes.includes(authedUser);
  const optTwoChosen = question.optionTwo.votes.includes(authedUser);

  return {
    loggedIn: true,
    notFound: false,
    question,
    author,
    loading: false,
    optOneChosen: optOneChosen,
    optTwoChosen: optTwoChosen
  };
}

export default connect(mapStateToProps)(QuestionWrapper);
