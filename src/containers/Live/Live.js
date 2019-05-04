import React, { Component } from 'react';
import './Live.css';
import StatisticIcon from '@material-ui/icons/Equalizer';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Button, ToggleButton, ToggleButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";


class Live extends Component{
	constructor(props){
		super(props);
		console.log(props)
		this.state = {
			show_correct_answer: false,
			started:false,
			current_quiz_index: this.props.question_number-1,
		}
		this.toggleShowCorrectAnswer = this.toggleShowCorrectAnswer.bind(this);
		this.toggleStarted = this.toggleStarted.bind(this);
	}

	toggleShowCorrectAnswer(){
		this.setState({
			show_correct_answer:!this.state.show_correct_answer,
		})
	}
	toggleStarted(){
		this.setState({
			started:!this.state.started,
		})
	}
	render(){
		return(
			<div className='Live'>				
				<LiveQuiz quiz={this.props.quiz} question_number={this.props.question_number} show_correct_answer={this.state.show_correct_answer}/>
				<LiveMenu toggleShowCorrectAnswer={this.toggleShowCorrectAnswer} toggleStarted={this.toggleStarted} started={this.state.started} current_quiz_index={this.state.current_quiz_index} quizzes={this.props.quizzes}/>
			</div>
		)
	}
}

class LiveQuiz extends Component{
	constructor(props){
		super(props);
	}

	makeAns(){
		var answers = this.props.quiz.answers;
		let components = [];
		if (this.props.show_correct_answer){
			for (let i=0; i<answers.length; i++){
				if (i == this.props.quiz.correct_answer){
					components.push(<div className='correct-answer'>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
				else{
					components.push(<div className='incorrect-answer'>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
			}
		}
		else{
			for (let i=0; i<answers.length; i++){
				components.push(<div className='live-answer'>{String.fromCharCode(i+65)}. {answers[i]}</div>)
			}
		}
		return components;
	}

	render(){
		return(
			<div className='LiveQuiz'> 
				<div className='quiz-number'>
					<p> {this.props.question_number}. </p>
				</div>
				<div className='quiz-content'>
					<p className='question'> {this.props.quiz.question} </p>
					<div className='answers'>{this.makeAns()}</div>
				</div>
				<div className='quiz-duration' >
					<p> {this.props.quiz.time_duration} </p>
				</div>
			</div>
		)
	}
}

class LiveMenu extends Component{
	constructor(props){
		super(props);
	}

	buttonContent(){
		if (this.props.started){
			return('Berhenti')
		}
		else{
			return('Mulai')
		}
	}
	render(){
		return(
			<div className='LiveMenu'>
				<div className='navigator'>
					<IconButton className='icon-btn'><ExpandMoreIcon style={{transform:'rotate(90deg)', margin:'auto', color:'white'}}/></IconButton>
					<Button className='button' onClick={this.props.toggleStarted}>{this.buttonContent()}</Button>
					<IconButton className='icon-btn'><ExpandLessIcon style={{transform:'rotate(90deg)', margin:'auto', color:'white'}}/></IconButton>
				</div>
				<div className='quizzes-options'>
					<p><QuizzesOption current_quiz_index={this.props.current_quiz_index} quizzes={this.props.quizzes}/></p>
				</div>
				<div className='icons'>
					<IconButton className='icon-btn' onClick={this.props.toggleShowCorrectAnswer}><CheckCircleOutline className='icon'/><p>Jawaban</p></IconButton>
					<IconButton className='icon-btn'><StatisticIcon className='icon'/><p>Statistik</p></IconButton>
				</div>
				<div className='timer'>
					<p>2:00</p>
				</div>
				<div className='counter'>
					<p>100</p>
				</div>
			</div>
		)
	}
}

class QuizzesOption extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	createMenuItem(quizzes, current_quiz_index){
		let length = quizzes.length
		let result = []

		for (let i=0; i<length; i++){
			if (i != current_quiz_index){
				result.push(<ToggleButton className='button' type='radio' value={i}> Pertanyaan {i+1} </ToggleButton>)
			}
		}
		return result;
	}

	handleChange(value, event){
		//this.props.changeSelectedCourse(value);
	}
	render(){
		return(
			<Dropdown drop={'up'}>
				<Dropdown.Toggle className='toggle-button'> Pertanyaan {this.props.current_quiz_index+1} </Dropdown.Toggle>			
				<Dropdown.Menu>
					<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' onChange={this.handleChange}>
						{this.createMenuItem(this.props.quizzes, this.props.current_quiz_index)}
					</ToggleButtonGroup>
				</Dropdown.Menu>
			</Dropdown>

		
		)
	}
}
export default Live;