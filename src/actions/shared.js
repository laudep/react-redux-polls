import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData, saveQuestionAnswer } from "../utils/api";

import { receiveUsers, saveUserVote, removeUserVote } from "./users";
import { receiveQuestions, savePollVote, removePollVote } from "./questions";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

/**
 * Handle poll vote/question answer
 *
 * 1) Save answer with API call
 * 2) Update state: questions
 * 3) Update state: users
 */
export function handleQuestionAnswer(authedUser, id, answer) {
  return dispatch => {
    dispatch(savePollVote(authedUser, id, answer));
    dispatch(saveUserVote(authedUser, id, answer));
    return saveQuestionAnswer(authedUser, id, answer).catch(() => {
      dispatch(removePollVote(authedUser, id, answer));
      dispatch(removeUserVote(authedUser, id, answer));
      alert("Error saving poll vote. Please try again.");
    });
  };
}
