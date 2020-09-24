import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter,Redirect} from 'react-router-dom'
import {Card,CardContent,CardHeader,Avatar,LinearProgress} from '@material-ui/core'
import '../css/result.css'

class Result extends Component{
  
	render(){
      const {optionOne,optionTwo,question,questionAuthor,authedUser}=this.props
      if(!question){
        return(<div>Loading</div>)
      }
      else if(authedUser===null){return (<Redirect to='/login'/>)}
      else {
        const percentageOptionOne=(optionOne.votes.length/(optionOne.votes.length+optionTwo.votes.length))*100
        const percentageOptionTwo=(optionTwo.votes.length/(optionOne.votes.length+optionTwo.votes.length))*100 
        const highlighterOne=optionOne.votes.includes(authedUser)?true:false
        const highlighterTwo=optionTwo.votes.includes(authedUser)?true:false
        return(
      	 <div className='question__container__res'>
            <div className='question__res'>
      			<Card className='card__res'>
					<CardHeader className='question__header__res' title={`asked By ${questionAuthor.name}`}/>
      				<CardContent >
      					<div className='card__content'>
							<div className='avatar'>
								<Avatar src={questionAuthor.avatarURL} style={{flex:'0.33',marginRight:'20px'}}></Avatar>
                            </div>
							<div className='answer__res'>
								<h3>Results:</h3>
                                <Card className='result__container__res' style={{backgroundColor:highlighterOne?'#E6E6FA':''}}>
                                  <h5>Would you rather {optionOne.text}?</h5>
                                  <LinearProgress variant="determinate" value={percentageOptionOne}/><span>{percentageOptionOne}%</span>
                                  <h5>{optionOne.votes.length} out of {optionOne.votes.length+optionTwo.votes.length} votes</h5>
								</Card>
								 <Card className='result__container__res' style={{backgroundColor:highlighterTwo?'#E6E6FA':''}}>
                                   	<h5>Would you rather {optionTwo.text}?</h5>
                                  <LinearProgress variant="determinate" value={percentageOptionTwo}/><span>{percentageOptionTwo}%</span>
									<h5>{optionTwo.votes.length} out of {optionOne.votes.length+optionTwo.votes.length} votes</h5>
								</Card>
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

function mapStateToProps({questions,authedUser,users},{id}){
  	//const id='loxhs1bqm25b708cmbf3g'
    const question=questions?questions[id]:null
    const optionOne=question?question.optionOne:null
    const optionTwo=question?question.optionTwo:null
    const questionAuthor=question?users[question.author]:null
	return{
      question,
      questionAuthor,
      optionOne,
      optionTwo,
      authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Result))