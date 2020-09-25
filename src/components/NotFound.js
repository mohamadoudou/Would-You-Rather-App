import React from 'react'
import {connect} from 'react-redux'
import {Redirect,withRouter} from 'react-router-dom'

const NotFound=({authedUser})=>
    authedUser?(
        <h1 style={{textAlign:'center'}}>uuppps!!!  Not Found</h1>
     ):(
        <Redirect to={{
         pathname:'/login',
         state:{referrer:'/badUrl'}
       }}/>
     )



function mapStateToProps({authedUser}){
	return{
      authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NotFound))