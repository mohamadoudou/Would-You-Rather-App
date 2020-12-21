import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button, Avatar } from '@material-ui/core'
import { handleLogout } from '../actions/authedUser'
import '../css/navBar.css'

class NavBar extends Component {

  handleSubmit = () => {
    this.props.dispatch(handleLogout())
    this.props.history.push('/login')
  }
  clear
  render() {
    const active = this.props.location.pathname ? this.props.location.pathname : undefined
    const { logUser } = this.props
    const logUserView = logUser ? (
      <React.Fragment>
        <p>Hello, {logUser.name} </p>
        <Avatar src={logUser.avatarURL} className='avatar__logout' />
        <Button
          color="inherit"
          onClick={this.handleSubmit}
          className='logout__button'
        >LogOut</Button>
      </React.Fragment>
    ) : (null)

    return (
      <div className='root'>
        <AppBar position="static" className='nav__container'>
          <Toolbar className='tool__bar'>
            <Typography variant="h6" className='title'>
              <Link
                to='/'
                className='nav__link'
                style={{ color: active === '/' ? 'rgb(167, 238, 190)' : null }}
              >Home</Link>
            </Typography>
            <Typography variant="h6" className='title'>
              <Link
                to='/add'
                className='nav__link'
                style={{ color: active === '/add' ? 'rgb(167, 238, 190)' : null }}
              >New Question</Link>
            </Typography>
            <Typography variant="h6" className='title'>
              <Link
                to='/leaderboard'
                className='nav__link'
                style={{ color: active === '/leaderboard' ? 'rgb(167, 238, 190)' : null }}
              >Leader Board</Link>
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

function mapStateToProps({ users, authedUser }) {
  const logUser = authedUser ? users[authedUser] : null
  return {
    logUser
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))