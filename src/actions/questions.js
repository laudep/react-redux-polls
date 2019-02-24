import { handleInitialData } from "./shared";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const SAVE_POLL_VOTE = "SAVE_POLL_VOTE";
export const REMOVE_POLL_VOTE = "REMOVE_POLL_VOTE";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
export function answerQuestion(authedUser, id, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    id,
    answer
  };
}

export function savePollVote(authedUser, id, answer) {
  return {
    type: SAVE_POLL_VOTE,
    authedUser,
    id,
    answer
  };
}

export function removePollVote(authedUser, id, answer) {
  return {
    type: REMOVE_POLL_VOTE,
    authedUser,
    id,
    answer
  };
}

export function handleQuestionAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestionAnswer(authedUser, id, answer).then(() => {
      dispatch(handleInitialData());
      dispatch(hideLoading());
    });
  };
}

export function handleQuestionAddition(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOne: optionOneText,
      optionTwo: optionTwoText,
      author: authedUser
    }).then(() => {
      dispatch(handleInitialData());
      dispatch(hideLoading());
    });
  };
}
