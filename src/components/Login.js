import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { setAuthedUser } from '../actions/authedUser'
import '../css/login.css'

class Login extends Component {
  state = {
    selectedUser: ''
  }

  handleChange = (e) => {
    e.persist()
    this.setState(() => ({
      selectedUser: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.selectedUser))
    const redirect_to = this.props.location.state ? this.props.location.state.from : '/'
    this.props.history.push(redirect_to)
  }

  render() {

    if (!this.props.users) { return (<div>loading</div>) }
    const { userIds, users } = this.props
    return (
      <div className='container__login'>
        <Card className='card__login'>
          <div className='card__welcome'>
            <CardHeader style={{ color: 'white', marginTop: 100 }} title='Welcome to the Would You Rather App' />
            <h4>Please sign in to continue</h4>
          </div>
          <CardContent>

            <h2>Sign in</h2>
            <form onSubmit={this.handleSubmit}>
              <select className='select__login' placeholder='Select User' defaultValue={this.state.selectedUser} onChange={this.handleChange}>
                <option disabled value='' hidden>Select User</option>
                {userIds.map((id) => {
                  return (
                    <option key={id} value={users[id].id}>{users[id].name}</option>
                  )
                })}
              </select><br />
              <button className='login__submit' type='submit'>sign in</button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const userIds = users ? Object.keys(users) : []
  return {
    userIds,
    users
  }
}

export default withRouter(connect(mapStateToProps)(Login))