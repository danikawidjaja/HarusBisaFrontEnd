import React, { Component } from 'react';
import './Live.css';
import StatisticIcon from '@material-ui/icons/Equalizer';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Button, ToggleButton, ToggleButtonGroup, DropdownButton, Dropdown, ButtonToolbar} from "react-bootstrap";
import Timer from '../Timer/Timer';


class Live extends Component{
	constructor(props){
		super(props);
		console.log(props)
		this.state = {
			show_correct_answer: false,
			started:false,
			current_quiz: this.props.quiz,
			secondsRemaining: this.props.quiz.time_duration
		}
		this.toggleShowCorrectAnswer = this.toggleShowCorrectAnswer.bind(this);
		this.toggleStarted = this.toggleStarted.bind(this);
		this.changeCurrentQuiz = this.changeCurrentQuiz.bind(this);
		this.findCurrentIndex = this.findCurrentIndex.bind(this);
		this.intervalHandle = null;
		this.tick = this.tick.bind(this);
		this.changeSecondsRemaining = this.changeSecondsRemaining.bind(this)
	}

	findCurrentIndex(current_quiz){
		let length =this.props.quizzes.length
		for (let i=0; i<length; i++){
			if (this.props.quizzes[i] === current_quiz){
				return i
			}
		}
	}

	changeSecondsRemaining(dur){
		this.setState({
			secondsRemaining : dur
		})
	}
	changeCurrentQuiz(current_quiz){
		this.setState({
			current_quiz: current_quiz,
			secondsRemaining: current_quiz.time_duration
		})
	}

	toggleShowCorrectAnswer(){
		this.setState(prevState =>{
			return{
				show_correct_answer:!prevState.show_correct_answer,
			}
		})
	}
	
	async toggleStarted(){
		await this.setState(prevState =>{
			return{
				started:!prevState.started,
			}
		})
		if (this.state.started){
			this.intervalHandle = setInterval(this.tick, 1000);
		}
		else{
			clearInterval(this.intervalHandle)
			this.setState({
				secondsRemaining:0
			})
		}
	}

	tick(){
		if (this.state.secondsRemaining <= 1){
			clearInterval(this.intervalHandle)
			this.toggleStarted()
		}
		this.setState(prevState => {
			return{
				secondsRemaining: prevState.secondsRemaining-1
			}
		}) 
	}


	render(){
		return(
			<div className='Live'>				
				<LiveQuiz duration={this.state.secondsRemaining} quiz={this.state.current_quiz} findCurrentIndex={this.findCurrentIndex} show_correct_answer={this.state.show_correct_answer}/>
				<LiveMenu duration={this.state.secondsRemaining} changeSecondsRemaining={this.changeSecondsRemaining} changeCurrentQuiz={this.changeCurrentQuiz} current_quiz={this.state.current_quiz} findCurrentIndex={this.findCurrentIndex} toggleShowCorrectAnswer={this.toggleShowCorrectAnswer} toggleStarted={this.toggleStarted} started={this.state.started} current_quiz_index={this.state.current_quiz_index} quizzes={this.props.quizzes}/>
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
					<p> {this.props.findCurrentIndex(this.props.quiz) + 1}. </p>
				</div>
				<div className='quiz-content'>
					<p className='question'> {this.props.quiz.question} </p>
					<div className='answers'>{this.makeAns()}</div>
				</div>
				<div className='quiz-duration' >
					<Timer duration={this.props.duration}/>
				</div>
			</div>
		)
	}
}

class LiveMenu extends Component{
	constructor(props){
		super(props);
		this.nextQuiz = this.nextQuiz.bind(this);
		this.prevQuiz = this.prevQuiz.bind(this);
	}

	buttonContent(){
		if (this.props.started){
			return('Berhenti')
		}
		else{
			return('Mulai')
		}
	}

	nextQuiz(){
		var current_index = this.props.findCurrentIndex(this.props.current_quiz);
		if (current_index == this.props.quizzes.length-1){
			alert('already at last quiz')
		}
		else{
			this.props.changeCurrentQuiz(this.props.quizzes[current_index+1])
		}
	}
	prevQuiz(){
		var current_index = this.props.findCurrentIndex(this.props.current_quiz);
		if (current_index == 0){
			alert('already at the very beginning')
		}
		else{
			this.props.changeCurrentQuiz(this.props.quizzes[current_index-1])
		}
	}


	render(){
		return(
			<div className='LiveMenu'>
				<div className='navigator'>
					<IconButton className='icon-btn' onClick={this.prevQuiz} ><ExpandMoreIcon style={{transform:'rotate(90deg)', margin:'auto', color:'white'}}/></IconButton>
					<Button className='button' onClick={this.props.toggleStarted}>{this.buttonContent()}</Button>
					<IconButton className='icon-btn' onClick={this.nextQuiz}><ExpandLessIcon style={{transform:'rotate(90deg)', margin:'auto', color:'white'}}/></IconButton>
				</div>
				<div className='quizzes-options'>
					<p><QuizzesOption changeCurrentQuiz={this.props.changeCurrentQuiz} current_quiz={this.props.current_quiz} quizzes={this.props.quizzes} findCurrentIndex={this.props.findCurrentIndex}/></p>
				</div>
				<div className='icons'>
					<IconButton className='icon-btn' onClick={this.props.toggleShowCorrectAnswer}><CheckCircleOutline className='icon'/><p>Jawaban</p></IconButton>
					<IconButton className='icon-btn'><StatisticIcon className='icon'/><p>Statistik</p></IconButton>
				</div>
				<div className='timer'>
					<Timer duration={this.props.duration} adjust={true} changeSecondsRemaining={this.props.changeSecondsRemaining}/>
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
		console.log(props)
		this.handleChange = this.handleChange.bind(this);
	}
	createMenuItem(quizzes, current_quiz){
		let length = quizzes.length
		let result = []

		for (let i=0; i<length; i++){
			if (quizzes[i] !== current_quiz){
				result.push(<ToggleButton type='radio' value={i}> Pertanyaan {i+1} </ToggleButton>)
			}
		}
		return result;
	}

	handleChange(value, event){
		this.props.changeCurrentQuiz(this.props.quizzes[value])
	}
	
	render(){
		return(
			<Dropdown drop={'up'} id={'quizzes'}>						
				<Dropdown.Toggle  drop={'up'} id={'quizzes'}> Pertanyaan {this.props.findCurrentIndex(this.props.current_quiz) +1} </Dropdown.Toggle>		
				<Dropdown.Menu>		
					<ToggleButtonGroup name='lectureDates'type='radio' onChange={this.handleChange}>	
						{this.createMenuItem(this.props.quizzes, this.props.current_quiz)}
					</ToggleButtonGroup>	
				</Dropdown.Menu>		
			</Dropdown>	
	
		)
	}
}
export default Live;

