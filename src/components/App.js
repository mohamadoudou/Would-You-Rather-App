import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Switch } from 'react-router-dom'
import '../App.css';
import {handleGetUsers} from '../actions/users'
import {handleGetQuestions} from '../actions/questions'
import Questions from './Questions'
import Login from './Login'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import NavBar from './NavBar'
import NotFound from './NotFound'

class App extends Component {
  
  componentDidMount(){
  	this.props.dispatch(handleGetUsers())
    this.props.dispatch(handleGetQuestions())
  }
  render() {
    return (
      <div>
       	<h1 style={{textAlign:'center'}}>Would you rather!!!!</h1>
        <NavBar/>
        <Switch>
          <Route path='/login' exact > <Login /></Route>
          <Route path='/add' exact><NewQuestion/></Route>
          <Route path='/leaderboard' exact><Leaderboard/></Route>
          <Route path='/' exact> <Questions/></Route>
          <Route path='/questions/:question_id' exact><QuestionPage/></Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
