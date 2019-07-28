import React, { Component } from 'react';
import './Live.css';
import StatisticIcon from '@material-ui/icons/Equalizer';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { Button } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Timer from '../Timer/Timer';
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Grid from '@material-ui/core/Grid';
import {socket} from "../Dashboard/Dashboard";

class Live extends Component{
	constructor(props){
		super(props);
		this.state = {
			show_correct_answer: false,
			started:true,
			current_quiz: null,
			quiz_ids: [],
			current_quiz_id: this.props.quiz.id,
			isLoading:true,
			secondsRemaining: this.props.quiz.time_duration,
			show_stats: false,
		}
		this.toggleShowCorrectAnswer = this.toggleShowCorrectAnswer.bind(this);
		this.toggleStarted = this.toggleStarted.bind(this);
		this.changeCurrentQuizId = this.changeCurrentQuizId.bind(this);
		this.findCurrentIndex = this.findCurrentIndex.bind(this);
		this.changeSecondsRemaining = this.changeSecondsRemaining.bind(this)
		this.toggleShowStats = this.toggleShowStats.bind(this);
		this.quizSocket = this.quizSocket.bind(this);
	}

	findCurrentIndex(current_quiz){
		let length =this.props.quizzes.length
		for (let i=0; i<length; i++){
			if (this.props.quizzes[i].id === current_quiz.id){
				return i
			}
		}
	}

	async changeSecondsRemaining(dur){
		this.props.changeDuration(dur)
		socket.emit("change_quiz_time", {
			new_duration : dur,
			quiz_id: this.state.current_quiz_id
		});
	}
	async changeCurrentQuizId(current_quiz_id){
		await this.setState({
			current_quiz_id: current_quiz_id,
			isLoading: true,
			show_stats: false,
			show_correct_answer: false,
		})
		this.quizSetup();
	}
	
	async toggleShowCorrectAnswer(){
		await this.setState(prevState =>{
			return{
				show_correct_answer:!prevState.show_correct_answer,
			}
		})

		if (this.state.show_correct_answer == true){
			socket.emit("show_answer", {
				quiz_id:this.state.current_quiz_id
			})
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
		var quiz_ids = [];
		this.props.quizzes.forEach(quiz =>{
			quiz_ids.push(quiz.id);
		})
		this.setState({
			quiz_ids: quiz_ids
		})
		await this.quizSetup()
	}

	async quizSetup(){
		await socket.emit("show_current_quiz", {
			quiz_id: this.state.current_quiz_id
		})
		await socket.on("current_quiz", async data =>{
			var quiz = data.quiz
			quiz.total_participants = 0;
			await this.setState({
				current_quiz: quiz,
				secondsRemaining: quiz.time_duration,
				isLoading: false,
			})
			await this.quizSocket();
		})
	}
	quizSocket(){
		if (this.state.started){
			socket.emit("start_question", {quiz_id: this.state.current_quiz_id})
			socket.on("question_is_live", async data =>{
				var live = data.live
				var current_quiz = this.state.current_quiz
				current_quiz.live = live
				await this.setState({
					current_quiz: current_quiz,
					started: live
				})
			})
			socket.on("tick", async data =>{
				var time_duration = data.time_duration;
				await this.setState({
					secondsRemaining: time_duration
				})
			})
			if (this.state.secondsRemaining === 0){
				socket.emit("close_question", {
					quiz_id: this.state.current_quiz.id
				})
			}
			socket.on("new_answer", async ans =>{
				console.log("getting new ans")
				await socket.emit("record_answer", ans);	
			});
			socket.on("new_statistic", async stats =>{
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
		if (this.state.started){
			this.quizSocket();	
		}
		else{
			socket.emit("close_question", {
				quiz_id: this.state.current_quiz_id
			})
			this.props.changeDuration(0);
		}
	}

	render(){
		if (this.state.isLoading){
			return(<div className="Live"></div>)
		}else{
			return(
				<div className='Live'>				
					<LiveQuiz 
						show_stats={this.state.show_stats} 
						started={this.state.started} 
						duration={this.state.secondsRemaining} 
						quiz={this.state.current_quiz} 
						findCurrentIndex={this.findCurrentIndex} 
						show_correct_answer={this.state.show_correct_answer}/>
					<LiveMenu  
						show_stats={this.state.show_stats} 
						toggleShowStats={this.toggleShowStats} 
						show_correct_answer={this.state.show_correct_answer} 
						duration={this.state.secondsRemaining} 
						changeSecondsRemaining={this.changeSecondsRemaining} 
						changeCurrentQuizId={this.changeCurrentQuizId} 
						current_quiz={this.state.current_quiz} 
						findCurrentIndex={this.findCurrentIndex} 
						toggleShowCorrectAnswer={this.toggleShowCorrectAnswer} 
						toggleStarted={this.toggleStarted} 
						started={this.state.started} 
						current_quiz_id={this.state.current_quiz_id} 
						quiz_ids={this.state.quiz_ids}/>
				</div>
			)
		}
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
				components.push(<div className={this.props.quiz.live ? 'live-answer' : 'answer'}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
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
		var current_index = this.props.quiz_ids.indexOf(this.props.current_quiz_id)
		if (current_index == this.props.quiz_ids.length-1){
			alert('already at last quiz')
		}
		else{
			this.props.changeCurrentQuizId(this.props.quiz_ids[current_index+1])
		}
	}
	prevQuiz(){
		var current_index = this.props.quiz_ids.indexOf(this.props.current_quiz_id)
		if (current_index == 0){
			alert('already at the very beginning')
		}
		else{
			this.props.changeCurrentQuizId(this.props.quiz_ids[current_index-1])
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
					<p><QuizzesOption changeCurrentQuizId={this.props.changeCurrentQuizId} current_quiz={this.props.current_quiz} quiz_ids={this.props.quiz_ids} findCurrentIndex={this.props.findCurrentIndex} started={this.props.started}/></p>
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
	constructor(props) {
		super(props);
		this.state = {
		  dropdownOpen: false
		};
		this.toggle = this.toggle.bind(this);
		this.handleClick = this.handleClick.bind(this);
	  }
	
	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
		if (this.props.changeFlag){
			this.props.changeFlag();
		}
	}

	handleClick(index){
		this.props.changeCurrentQuizId(this.props.quiz_ids[index])
	}
	createMenuItem(quizzes, current_quiz){
		let length = quizzes.length
		let result = []

		for (let i=0; i<length; i++){
			if (quizzes[i] !== current_quiz.id){
				result.push(<DropdownItem value={i} onClick={()=>this.handleClick(i)}>Pertanyaan {i+1}</DropdownItem>)
			}
		}
		return result;
	}
	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret className='toggle-button' disabled={this.props.started}>
					Pertanyaan {this.props.findCurrentIndex(this.props.current_quiz) +1}
				</DropdownToggle>
				<DropdownMenu>
					{this.createMenuItem(this.props.quiz_ids, this.props.current_quiz)}
				</DropdownMenu>
			</Dropdown>
		);
	}
}
export default Live;

