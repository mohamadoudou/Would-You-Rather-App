import { _getQuestions } from '../_DATA'
export const GET_QUESTIONS = 'GET_QUESTIONS'


function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}


export function handleGetQuestions() {
  return (dispatch) => {
    return _getQuestions()
      .then((questions) => dispatch(getQuestions(questions)))
  }
}

