import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Button } from '@material-ui/core'
import '../css/questionDashboard.css'

class QuestionDashboard extends Component {


	render() {
		const { question_id } = this.props
		const { question, userAvatar, userName } = this.props
		const { optionOne, optionTwo } = question

		if (!question) {
			return (<div>Loading</div>)
		}
		return (<div className='question__container__dash'>
			<div className='question__dash'>
				<Card className='card__dash'>
					<div className='question__header__dash'><h4>{userName} asks:</h4> </div>
					<CardContent >
						<div className='card__content__dash'>
							<div className='avatar'>
								<Avatar src={userAvatar} style={{ flex: '0.33', marginRight: '15px' }}></Avatar>
							</div>
							<div className='answer__dash'>
								<h4>Would You Rather...</h4>
								<p><span>{optionOne.text} <b>Or</b> {optionTwo.text}</span></p>
								<Link to={`/questions/${question_id}`}><Button>View Detail</Button></Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		)
	}
}

function mapStateToProps({ questions, users, authedUser }, { question_id }) {
	const question = questions ? questions[question_id] : null
	const userAvatar = users && question ? users[question.author].avatarURL : null
	const userName = users && question ? users[question.author].name : null
	return {
		question,
		authedUser,
		userAvatar,
		userName
	}
}

export default connect(mapStateToProps)(QuestionDashboard)