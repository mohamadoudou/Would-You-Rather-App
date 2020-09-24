import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import UserStat from './UserStat'

class Leaderboard extends Component {

  render(){
    const {sortUsers,authedUser}= this.props  
    if(authedUser===null){
    return( <Redirect to='/login' />)
    }
    else{
  	return (
      	<div style={{marginTop:'20px'}}>
        	{sortUsers.map((user)=>{
    			return(
                	<li key={user.id}>
                  		<UserStat userId={user.id}/>
                  	</li>
                )
        	})}
      	</div>
   	 )
   }
  }

  
}

function mapStateToProps({users,authedUser}){
    const userScore = user =>Object.keys(user.answers).length + user.questions.length;
  	const sortUsers=users?Object.values(users)
    .sort((a,b)=>userScore(b)-userScore(a)):[]
	return{
     authedUser,
     sortUsers
     
    }
}

export default connect(mapStateToProps)(Leaderboard)