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
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Grid from '@material-ui/core/Grid';
 

class Live extends Component{
	constructor(props){
		super(props);
		console.log(props)
		this.state = {
			show_correct_answer: false,
			started:true,
			current_quiz: this.props.quiz,
			secondsRemaining: this.props.quiz.time_duration,
			show_stats: false,
		}
		this.toggleShowCorrectAnswer = this.toggleShowCorrectAnswer.bind(this);
		this.toggleStarted = this.toggleStarted.bind(this);
		this.changeCurrentQuiz = this.changeCurrentQuiz.bind(this);
		this.findCurrentIndex = this.findCurrentIndex.bind(this);
		this.intervalHandle = null;
		this.tick = this.tick.bind(this);
		this.changeSecondsRemaining = this.changeSecondsRemaining.bind(this)
		this.toggleShowStats = this.toggleShowStats.bind(this);
	}

	findCurrentIndex(current_quiz){
		let length =this.props.quizzes.length
		for (let i=0; i<length; i++){
			if (this.props.quizzes[i] === current_quiz){
				return i
			}
		}
	}

	async changeSecondsRemaining(dur){
		await this.setState({
			secondsRemaining : dur
		})
		this.props.changeDuration(dur);
		var data = {
			course_id:this.props.course_id,
			lecture_id:this.props.lecture_id,
			quiz_id:this.state.current_quiz.id,
			new_duration : dur
		}
		this.props.socket.emit("change_quiz_time", data);
	}
	async changeCurrentQuiz(current_quiz){
		await this.setState({
			current_quiz: current_quiz,
			secondsRemaining: current_quiz.time_duration
		})
	}

	async toggleShowCorrectAnswer(){
		await this.setState(prevState =>{
			return{
				show_correct_answer:!prevState.show_correct_answer,
			}
		})

		if (this.state.show_correct_answer == true){
			var data = {
				course_id:this.props.course_id,
				lecture_id:this.props.lecture_id,
				quiz_id:this.state.current_quiz.id
			}
			this.props.socket.emit("show_answer", data)
		}
	}

	toggleShowStats(){
		this.setState(prevState =>{
			return{
				show_stats: !prevState.show_stats
			}
		})
	}
	
	async componentDidMount(){
		var current_quiz = this.state.current_quiz;
		current_quiz.total_participants = 0;
		this.setState({
			current_quiz: current_quiz,
		})
		var data = {
			course_id:this.props.course_id,
			lecture_id:this.props.lecture_id,
			quiz_id:this.state.current_quiz.id
		}
		if (this.state.started){
			this.props.socket.emit("start_question", data)
			this.intervalHandle = setInterval(this.tick, 1000);
			this.props.socket.on("new_answer", async ans =>{
				await this.props.socket.emit("record_answer", ans);	
			});
			this.props.socket.on("new_statistic", async stats =>{
				var current_quiz = this.state.current_quiz;
				current_quiz.stat = stats.answers;
				current_quiz.total_participants = stats.total_participants;
				this.setState({
					current_quiz: current_quiz
				})
			})
		}
	}
	async toggleStarted(){
		await this.setState(prevState =>{
			return{
				started:!prevState.started,
			}
		})
		var data = {
			course_id:this.props.course_id,
			lecture_id:this.props.lecture_id,
			quiz_id:this.state.current_quiz.id
		}
		if (this.state.started){
			this.props.socket.emit("start_question", data)
			this.intervalHandle = setInterval(this.tick, 1000);
			this.props.socket.on("new_answer", ans =>{
				this.props.socket.emit("record_answer", ans);	
			});
			this.props.socket.on("new_statistic", async stats =>{
				var current_quiz = this.state.current_quiz;
				current_quiz.stat = stats.answers;
				current_quiz.total_participants = stats.total_participants;
				this.setState({
					current_quiz: current_quiz,
				})
			})
			
		}
		else{
			clearInterval(this.intervalHandle);
			this.props.socket.emit("close_question", data)
			this.setState({
				secondsRemaining:0
			}) 
			this.props.changeDuration(0);
		}
	}

	tick(){
		var data = {
			course_id:this.props.course_id,
			lecture_id:this.props.lecture_id,
			quiz_id:this.state.current_quiz.id
		}
		if (this.state.secondsRemaining <= 1){
			clearInterval(this.intervalHandle);
			this.props.socket.emit("close_question", data)
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
				<LiveQuiz show_stats={this.state.show_stats} started={this.state.started} duration={this.state.secondsRemaining} quiz={this.state.current_quiz} findCurrentIndex={this.findCurrentIndex} show_correct_answer={this.state.show_correct_answer}/>
				<LiveMenu  show_stats={this.state.show_stats} toggleShowStats={this.toggleShowStats} show_correct_answer={this.state.show_correct_answer} duration={this.state.secondsRemaining} changeSecondsRemaining={this.changeSecondsRemaining} changeCurrentQuiz={this.changeCurrentQuiz} current_quiz={this.state.current_quiz} findCurrentIndex={this.findCurrentIndex} toggleShowCorrectAnswer={this.toggleShowCorrectAnswer} toggleStarted={this.toggleStarted} started={this.state.started} current_quiz_index={this.state.current_quiz_index} quizzes={this.props.quizzes}/>
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
				components.push(<div className={this.props.started ? 'live-answer' : 'answer'}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
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
					<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
						<div className='answers' style={{width: this.props.show_stats ? '50%':'100%' }}>{this.makeAns()}</div>
						<div className='quiz-stat'>{this.props.show_stats ?	<QuizStat stat={this.props.quiz.stat} show_correct_answer={this.props.show_correct_answer} answers={this.props.quiz.answers} correct_answer={this.props.quiz.correct_answer}/> : null}</div>
					</div>
				</div>
				<div className='quiz-duration' >
					<Timer duration={this.props.duration}/>
				</div>
			</div>
		)
	}
}

class QuizStat extends Component{
	constructor(props){
		super(props);
	}

	makeCircularBars(){		
		var data = this.props.stat
		var keys = Object.keys(data);
		var components = []
		//assume happy path. remember to implement test case when no one has answered yet.
		for (let i=0; i<keys.length; i++){
			if (this.props.show_correct_answer){
				if (i==this.props.correct_answer){
					components.push(
						<Grid item xs={5}>
							<CircularProgressbarWithChildren 
							value={data[keys[i]]}
							styles={buildStyles({
					          backgroundColor: "transparent",
					          pathColor: "#82DAA4",
					          trailColor: "#EBEBEB",
					        })}
					     	>
								<h1>{data[keys[i]]}%</h1>
								<p>{keys[i]}.</p>
							</CircularProgressbarWithChildren>
						</Grid>
					)
				}
				else{
					components.push(
						<Grid item xs={5}>
							<CircularProgressbarWithChildren 
							value={data[keys[i]]}
							styles={buildStyles({
					          backgroundColor: "transparent",
					          pathColor: "#9B9B9B",
					          trailColor: "#EBEBEB",
					        })}
					     	>
								<h1>{data[keys[i]]}%</h1>
								<p>{keys[i]}.</p>
							</CircularProgressbarWithChildren>
						</Grid>
					)
				}
			}
			else{
				components.push(
					<Grid item xs={5}>
						<CircularProgressbarWithChildren 
						value={data[keys[i]]}
						styles={buildStyles({
				          backgroundColor: "transparent",
				          pathColor: "#9B9B9B",
				          trailColor: "#EBEBEB",
				        })}
				     	>
							<h1>{data[keys[i]]}%</h1>
							<p>{keys[i]}.</p>
						</CircularProgressbarWithChildren>
					</Grid>
				)
			}
		}

		return components
	}
	render(){
		return(
			<Grid container justify='space-between' alignItems='center' alignContent='center'>
				{this.makeCircularBars()}
			</Grid>
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
					<IconButton className='icon-btn' onClick={this.prevQuiz}  disabled={this.props.started ? true : false}><ExpandMoreIcon className='icon'/></IconButton>
					<Button className='button' onClick={this.props.toggleStarted} disabled={this.props.duration == 0 ? true : false}>{this.buttonContent()}</Button>
					<IconButton className='icon-btn' onClick={this.nextQuiz} disabled={this.props.started ? true : false}><ExpandLessIcon className='icon'/></IconButton>
				</div>
				<div className='quizzes-options'>
					<p><QuizzesOption changeCurrentQuiz={this.props.changeCurrentQuiz} current_quiz={this.props.current_quiz} quizzes={this.props.quizzes} findCurrentIndex={this.props.findCurrentIndex}/></p>
				</div>
				<div className='icons'>
					<IconButton className={this.props.show_correct_answer? 'icon-btn-on' : 'icon-btn-off'} disabled={this.props.started ? true : false} disableRipple={true} onClick={this.props.toggleShowCorrectAnswer}><CheckCircleOutline className='icon'/><p>Jawaban</p></IconButton>
					<IconButton className={this.props.show_stats? 'icon-btn-on':'icon-btn-off'} disableRipple={true} onClick={this.props.toggleShowStats}><StatisticIcon className='icon'/><p>Statistik</p></IconButton>
				</div>
				<div className='timer'>
					<Timer duration={this.props.duration} adjust={true} changeSecondsRemaining={this.props.changeSecondsRemaining}/>
				</div>
				<div className='counter'>
					<p>{this.props.current_quiz.total_participants}</p>
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

