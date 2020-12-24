import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import '../App.css';
import { handleGetUsers } from '../actions/users'
import { handleGetQuestions } from '../actions/questions'
import Questions from './Questions'
import Login from './Login'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import NavBar from './NavBar'
import NotFound from './NotFound'

function PrivateRoute({ authedUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authedUser === null ?
        <React.Fragment>
        { alert('please Login to Continue')}
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        </React.Fragment> : children
      }}
    />

  )
}

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetUsers())
    this.props.dispatch(handleGetQuestions())
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/login' exact > <Login /></Route>
          <PrivateRoute path='/add' exact authedUser={this.props.authedUser}><NewQuestion /></PrivateRoute>
          <PrivateRoute path='/leaderboard' exact authedUser={this.props.authedUser}><Leaderboard /></PrivateRoute>
          <PrivateRoute path='/' exact> <Questions /></PrivateRoute>
          <Route path='/questions/:question_id' exact><QuestionPage /></Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
