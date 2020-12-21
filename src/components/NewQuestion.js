import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { handleAddQuestion } from '../actions/shared'
import '../css/newQuestion.css'


class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleChange = (e) => {
    e.persist()
    const name = e.target.name
    this.setState(() => ({
      [name]: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const author = this.props.authedUser
    this.props.dispatch(handleAddQuestion({ optionOneText, optionTwoText, author }))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: ''
    }))

    this.props.history.push('/')
  }

  render() {
    if (this.props.authedUser === null) {
      return (< Redirect to={{
        pathname: '/login',
        state: { referrer: '/add' }
      }} />)
    }
    const enabled = this.state.optionOneText.length > 0 && this.state.optionTwoText.length > 0

    return (
      <div>
        <Card className='card__new__question'>
          <CardHeader title='Create New Question' />
          <CardContent>
            <p>Complete the question</p>
            <p>Would you rather...</p>
            <form onSubmit={this.handleSubmit}>
              <input type='text' name='optionOneText' value={this.state.optionOneText}
                className='input__question'
                placeholder='Enter Option One Text Here' onChange={this.handleChange} />
              <p>or</p>
              <input type='text' name='optionTwoText' value={this.state.optionTwoText}
                className='input__question'
                placeholder='Enter Option Two Text Here' onChange={this.handleChange} />
              <br /><br />
              <button type='submit' disabled={!enabled}>Submit</button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))