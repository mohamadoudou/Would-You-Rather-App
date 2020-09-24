import {GET_USERS} from '../actions/users'
import {SAVE_ANSWER,ADD_QUESTION} from '../actions/shared'

export function users(state={},action){
  switch(action.type){
    case GET_USERS:
      return {
      	...state,
          ...action.users
      }
    case SAVE_ANSWER:
      const { authedUser, qid, answer } = action
          return{
            ...state,
            [authedUser]: {
              ...state[authedUser],
              answers: {
                ...state[authedUser].answers,
                [qid]: answer
              }
            }
          }
    case ADD_QUESTION:
      return{
        ...state,
        [action.formattedQuestion.author]: {
          ...state[action.formattedQuestion.author],
          questions: state[action.formattedQuestion.author].questions.concat([action.formattedQuestion.id])
        }
      
      }
    default: return state
  }
}