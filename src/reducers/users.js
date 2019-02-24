import { RECEIVE_USERS, SAVE_USER_VOTE, REMOVE_USER_VOTE } from "../actions/users";
import {
  ADD_QUESTION,
  ANSWER_QUESTION,
} from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat(
            action.question.id
          )
        }
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    case SAVE_USER_VOTE:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.id]: action.answer
          }
        }
      };
    case REMOVE_USER_VOTE:
      const { [action.id]: value, ...newAnswers } = state[action.user].answers;
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: newAnswers
        }
      };
    default:
      return state;
  }
}
