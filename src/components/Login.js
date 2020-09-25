import React ,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Card,CardHeader,CardContent,Button} from '@material-ui/core'
import {setAuthedUser} from '../actions/authedUser'
import '../css/login.css'

class Login extends Component{
  state={
  	selectedUser:''
  }
  
  handleChange=(e)=>{
   e.persist() 
  this.setState(()=>({
    selectedUser:e.target.value
  }))
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.selectedUser))
    const redirect_to=this.props.location.state?this.props.location.state.referrer:'/'
    this.props.history.push(redirect_to)
  }
  
  render(){
    
    if(!this.props.users){return(<div>loading</div>)}
    const {userIds,users}=this.props
  	return(
      <div className='container__login'>
    	<h2>Login</h2>
      	<Card className='card__login'>
      		<CardHeader title='Welcome to the Would You Rather App'/>
      		<CardContent>
      			<h4>Please sign in to continue</h4><br/>
                <h2>Sign in</h2>
      			<form onSubmit={this.handleSubmit}>
      				<select className='select__login' placeholder='Select User' defaultValue={this.state.selectedUser} onChange={this.handleChange}>
						<option disabled value='' hidden>Select User</option>
                        {userIds.map((id)=>{
                          return(
                          <option key={id} value={users[id].id}>{users[id].name}</option>
                          )
                         })}
      				</select><br/>
      				<Button type='submit'>sign in</Button>
      			</form>
      		</CardContent>
      	</Card>
      </div>
    )
  }
}

function mapStateToProps({users}){
	const userIds=users?Object.keys(users):[]
    return{
    userIds,
    users
    }
}

export default withRouter(connect(mapStateToProps)(Login))