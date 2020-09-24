import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,CardContent,CardHeader,Avatar} from '@material-ui/core'
import '../css/userStat.css'


class UserStat extends Component{

render(){
  
  const {user,answeredQuestions,createdQuestions}=this.props
  if(!user){
    return(<div>Loading</div>)
  }
  
  return(
      <div className='userStat'>
          <Card className='userStat__card'>
              <CardContent >
                  <div className='userStat__card__content'>
                      <div className='avatar'>
                          <Avatar src={user.avatarURL} style={{flex:'0.33',marginRight:'20px'}}/>
                      </div>
                      <div className='userStat'>
                          <Card className='userStat__score'>
                            <CardHeader title={user.name}/>
                            <h5>Answered Quetions: {answeredQuestions}</h5>
                            <h5>Create Quetions: {createdQuestions}</h5>
                          </Card>
                           <Card className='userStat__score'>
                              <CardHeader title='Score'/>
                              <CardContent>{answeredQuestions+createdQuestions}</CardContent>
                          </Card>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
)
}
}

function mapStateToProps({questions,authedUser,users},{userId}){
    const user=users?users[userId]:null
	const answeredQuestions=user?Object.keys(user.answers).length:0
	const createdQuestions=user?user.questions.length:0
	return{
      user,
      answeredQuestions,
      createdQuestions,
      authedUser
    }
}


export default connect(mapStateToProps)(UserStat)