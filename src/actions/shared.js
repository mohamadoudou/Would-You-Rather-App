import { _saveQuestionAnswer, _saveQuestion } from '../_DATA'

export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'


function saveAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

function addQuestion(formattedQuestion) {
  return {
    type: ADD_QUESTION,
    formattedQuestion
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question)
      .then((formattedQuestion) => dispatch(addQuestion(formattedQuestion)))
  }

}

export function handleSaveAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(saveAnswer(authedUser, qid, answer))
      })
  }
}

