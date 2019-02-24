import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_POLL_VOTE,
  REMOVE_POLL_VOTE
} from "../actions/questions";

export default function questions(state = null, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case SAVE_POLL_VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.concat(
              action.authedUser
            )
          }
        }
      };
    case REMOVE_POLL_VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.filter(
              vote => vote !== action.authedUser
            )
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}
