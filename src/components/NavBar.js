import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Button, Avatar} from '@material-ui/core'
import {handleLogout} from '../actions/authedUser'
import '../css/navBar.css'

class NavBar extends Component{
  
    handleSubmit=()=>{
      this.props.dispatch(handleLogout())
      this.props.history.push('/login')
    }  
  clear
	render(){
        
        const {logUser}=this.props
        const logUserView=logUser?(
                            <React.Fragment>
          						<h5>Hello, {logUser.name} :</h5>
                                   <Avatar src={logUser.avatarURL}/>
                                <Button color="inherit"  onClick={this.handleSubmit}>Log Out</Button>
                             </React.Fragment>
                                 ):(null)
      
    	return(
                <div className='root'>
                  <AppBar position="static">
                    <Toolbar className='tool__bar'>
                        <Typography variant="h6" className='title'>
                          <Link to='/' className='nav__link'>Home</Link>
                        </Typography>
                        <Typography variant="h6" className='title'>
                          <Link to='/add' className='nav__link'>New Question</Link>
                        </Typography>
                        <Typography variant="h6" className='title'>
                          <Link to='/leaderboard' className='nav__link'>Leader Board</Link>
                        </Typography>
                        <div className='logout' >
                            {logUserView}
                        </div>
                    </Toolbar>
                  </AppBar>
                </div>
        )
    }
}

function mapStateToProps({users,authedUser}){
  const logUser=authedUser?users[authedUser]:null
	return{
     logUser
    }
}

export default withRouter(connect(mapStateToProps)(NavBar))