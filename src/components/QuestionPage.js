import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter,Redirect} from 'react-router-dom'
import {Card,CardContent,Button,Avatar} from '@material-ui/core'
import {handleSaveAnswer} from '../actions/shared'
import Result from './Result'
import NotFound from './NotFound'
import  '../css/questionPage.css'

class QuestionPage extends Component{
  state={
  answer:''
  }

 handleOnchange=(e)=>{
   e.persist()
   this.setState(()=>({
     answer:e.target.value
   }))
 }   

  handleSubmit=(e)=>{
  e.preventDefault()
  const {authedUser,id}=this.props
  const qid=id
  const answer=this.state.answer
  if(authedUser===null){this.props.history.push('/login')}
  else{
      this.props.dispatch(handleSaveAnswer({authedUser,qid,answer}))
     }
  }
  
  render(){
    const {question,id}=this.props
    if(!question){
    	return(<NotFound/>)
    }
    const {optionOne,optionTwo}=question
    const {userAvatar,userName,authedUser} =this.props
    const enabled=this.state.answer.length>0
    const goToPoll=optionOne.votes.includes(authedUser)||optionTwo.votes.includes(authedUser)?false:true
    if(!goToPoll){ return(<Result id={id}/>)}
    else { 
       if(authedUser===null){return(<Redirect to='/login'/>)}
       return (
       <div className='question__container'>
            <div className='question'>
      			<Card className='card'>
					<div className='question__header'><h4>{userName} asks:</h4> </div>
      				<CardContent >
      					<div className='card__content'>
							<div className='avatar'>
								<Avatar src={userAvatar} style={{flex:'0.33',marginRight:'20px'}}></Avatar>
                            </div>
							<div className='answer'>
								<h4>Would You Rather...</h4>
                                <form onSubmit={this.handleSubmit}>
                                <input type='radio' id='answer1' name='answer' value='optionOne' onChange={this.handleOnchange}/>
                                <label htmlFor='answer1'>{optionOne.text}</label><br/>
                                <input type='radio' name='answer' value='optionTwo' onChange={this.handleOnchange}/>
                                <label htmlFor='answer2'>{optionTwo.text}</label><br/><br/>
                                <Button type='submit' disabled={!enabled}>Submit</Button>
                                </form>
							</div>
						</div>
      				</CardContent>
     			</Card>
      		</div>
      	 </div>
     )
  }
}
}

function mapStateToProps({questions,users,authedUser},props){
  const id= props.match.params?props.match.params.question_id:null
  	const question=questions?questions[id]:null
  	const userAvatar=users&&question?users[question.author].avatarURL:null
    const userName=users&&question?users[question.author].name:null
	return{
        id,
        authedUser,
    	question,
      	userAvatar,
        userName
      
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))