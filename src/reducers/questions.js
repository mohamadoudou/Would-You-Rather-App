import { GET_QUESTIONS } from '../actions/questions'
import { SAVE_ANSWER, ADD_QUESTION } from '../actions/shared'


export function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      //change the spread operations if any problem
      return {
        ...state,
        ...action.questions
      }
    case SAVE_ANSWER:
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.formattedQuestion.id]: action.formattedQuestion
      }
    default: return state
  }

}