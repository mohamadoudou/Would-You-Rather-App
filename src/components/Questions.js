import React ,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Card,Button} from '@material-ui/core'
import QuestionDashboard from './QuestionDashboard'
import '../css/questions.css'

class Questions extends Component{
    
  	state={
    	toggleAnswer:false
    }
    
	handleToggleAnswer=()=>{
       this.setState(()=>({
       toggleAnswer:true
       }))
    }
    handleToggleUnanswer=()=>{
       this.setState(()=>({
       toggleAnswer:false
       }))
    }

	render(){
   
      	const {answer,unanswer,questionIds,authedUser}=this.props

        if(questionIds.length<=0||unanswer===null||authedUser===null){return(<Redirect to='/login' />)}
        else if(this.state.toggleAnswer===false){
    	return(
        	<div>
                   <Card className='questions__container'>
                      <Button onClick={this.handleToggleUnanswer} style={{backgroundColor:this.state.toggleAnswer?'':'#E6E6FA'}}>Unanswer</Button>
                      <Button onClick={this.handleToggleAnswer} style={{backgroundColor:this.state.toggleAnswer?'#E6E6FA':''}}>Answer</Button>                   
                   </Card>
                 <ul>                       
                  {unanswer.map((id)=>{
                    return(
                     <li key={id}>
                      <QuestionDashboard question_id={id}/>
                     </li>
                    )})}
				</ul>
          	</div>
          )
        }
        else{
        return(
          <div>
                   <Card className='questions__container'>
                      <Button onClick={this.handleToggleUnanswer} style={{backgroundColor:this.state.toggleAnswer?'':'#E6E6FA'}}>Unanswer</Button>
                      <Button onClick={this.handleToggleAnswer} style={{backgroundColor:this.state.toggleAnswer?'#E6E6FA':''}}>Answer</Button>                   
                   </Card>
                 <ul>                       
                  {answer.map((id)=>{
                    return(
                     <li key={id}>
                      <QuestionDashboard question_id={id}/>
                     </li>
                    )})}
				</ul>
          	</div>
          )
        }
     }
}
function mapStateToProps({questions,authedUser,users}){
  	const questionIds=Object.keys(questions)
    .sort((a,b)=>questions[b].timestamp-questions[a].timestamp)
    const currentUser=users[authedUser]
    const answers=currentUser?currentUser.answers:null
    const answerIds=answers?Object.keys(answers):[]
    const unanswer=answers?questionIds.filter((id)=>!answerIds.includes(id)):null
    const answer=answers?questionIds.filter((id)=>answerIds.includes(id)):null
	return{
    	questionIds,
        answer,
        unanswer,
        authedUser
    }
}

export default connect(mapStateToProps)(Questions)