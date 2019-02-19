import { handleInitialData } from "./shared";
import { saveQuestionAnswer } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

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
