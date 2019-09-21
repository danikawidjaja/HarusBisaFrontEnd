import React, { Component } from 'react';
import {DashboardNavigation} from '../Dashboard/Dashboard';
import  '../Dashboard/Dashboard.css';
import './Lecture.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Popup from 'reactjs-popup';
import Checkbox from '@material-ui/core/Checkbox';
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import Logo from '../Logo/Logo';
import Timer from '../Timer/Timer';
import { socket } from '../Dashboard/StudentDashboard';

class Lecture extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			profile:{
      			first_name : "",
      			last_name : "",
      			email: "",
      			role: "",
      			school: "",
      			id:''
      		},
      		selected_lecture:null,
      		selected_course: null,
      		show_my_answer: false,
      		show_correct_answer: false,
      		live:true,
      		new_quiz:false,
      		live_quizzes: []
		}
		this.toggleNew = this.toggleNew.bind(this);
		this.newQuiz = this.newQuiz.bind(this);
		this.setShowMyAnswer = this.setShowMyAnswer.bind(this);
	}

	findSelected(id, list, type){
		for (let i=0; i<list.length; i++){
			if (type == 'course'){
				if (list[i]._id == id){
					return list[i];
				}
			}
			else if (type == 'lecture'){
				if (list[i].id == id){
					return list[i];
				}
			}
		}
		return null;
	}

	socketConnection(){
		if (socket){
			console.log(this.state)
			socket.emit("participate_lecture", {lecture_id: this.state.selected_lecture.id})
			socket.on("lecture_status", async data =>{
				await this.setState({
					live_quizzes: data.quizzes
				})
			})
			console.log(this.state)
			console.log('waiting for new question')
			socket.on("new_question", data =>{
				var quiz = data.quiz;
			  	var live_quizzes = this.state.live_quizzes;
			 	var quiz_id = quiz.id;
			  	var index = null;
			  	if (live_quizzes.length != 0){
				  for(let i=0; i<live_quizzes.length; i++){
					  if (live_quizzes[i].id === quiz_id){
						  index = i;
					  }
				  }
			  	}
				if (index == null){
					live_quizzes.push(quiz);
				}
				else{
					live_quizzes[index] = quiz;
				}
				this.setState({
					live_quizzes: live_quizzes,
					new_quiz: true,
				})
			  })
			socket.on("tick", async data =>{
				var quiz_id = data.quiz_id;
				var time = data.time_duration;
				var live_quizzes = this.state.live_quizzes
				if (live_quizzes.length != 0){
					for(let i=0; i<live_quizzes.length; i++){
						if (live_quizzes[i].id === quiz_id){
							live_quizzes[i].time_duration = time
						}
					}
				}
				await this.setState({
					live_quizzes: live_quizzes
				})
			})
			socket.on("question_is_live", async data =>{
				var quiz_id = data.quiz_id
				var live = data.live
				var live_quizzes = this.state.live_quizzes
				if (live_quizzes.length != 0){
					for(let i=0; i<live_quizzes.length; i++){
						if (live_quizzes[i].id === quiz_id){
							live_quizzes[i].live = live
						}
					}
				}
				await this.setState({
					live_quizzes: live_quizzes
				})
			})
		
		
		  	socket.on("answer_opened", data =>{
			  	var quiz_answer = data.correct_answer
				var quiz_id = data.quiz_id
				var live_quizzes = this.state.live_quizzes;
				var target_quiz_index = null;
				for(let i=0; i<live_quizzes.length; i++){
					if (live_quizzes[i].id === quiz_id){
						target_quiz_index = i
						break;
					}
				}
				live_quizzes[target_quiz_index].show_correct_answer = true
				live_quizzes[target_quiz_index].correct_answer = quiz_answer
				this.setState({
					live_quizzes: live_quizzes,
				})
		  })
		}
	}
	async initialization(){
		var course_id = this.props.match.params.course_id;
		var lecture_id = this.props.match.params.lecture_id;
		await this.props.Auth.getData()
		.then(async res =>{
			var selected_course = this.findSelected(course_id, res.data.courses, "course")
			if (!selected_course){
				throw new Error()
			}
			await this.setState({
				courses: res.data.courses,
				selected_course: selected_course,
				profile:{
					first_name : res.data.first_name,
					last_name : res.data.last_name,
					email: res.data.email,
					role: res.data.role,
					school: res.data.school,
					id: res.data._id,
				},
			}, async () =>
			await this.props.Auth.getLectures(this.state.selected_course._id)
			.then(async res =>{
				var temp = this.findSelected(lecture_id, res.data.lectures,'lecture')
				if (!temp){
					throw new Error()
				}
				await this.setState({
					selected_lecture: temp,
					isLoading: false
				})
				if (this.state.live){
					this.socketConnection();
				}
			})
			.catch(err =>{
				console.log(err.message)
				this.props.history.push("/notfound")
			  })	
		)
		})
		.catch(err =>{
		  console.log(err.message)
		  this.props.history.push("/notfound")
		})

		if (!this.state.live){
			if (socket){
				socket.disconnect();
				console.log('socket disconnected')
			}
		}
		if (socket && this.state.live){
			socket.on("lecture_is_live",(data) =>{
				this.setState({
				  live: data.live
			  })
			  if (!data.live){
				  if (socket){
					  socket.disconnect()
					  console.log('socket disconnected')
					  this.props.history.push('/student-dashboard/'+ course_id)
				  }
			  }
		  })
	  }
	}
	async componentDidMount(){
		var live = this.props.match.params.live;
		if (live == 0){
			live = false //past session
		}
		else{
			live = true //current session
		}

		await this.setState({
			live: live
		})

  		this.props.isNavVisible(false);
		window.scrollTo(0, 0);
		this.initialization();
	}
	
	componentWillUnmount(){
		if (this.state.isLoading == false && socket !== undefined && socket !== null){
			console.log(socket)
			socket.emit("leave_lecture",{lecture_id: this.state.selected_lecture.id})
		}
	}
    makeQuizzes(){
    	var quizzes = this.state.live ? this.state.live_quizzes : this.state.selected_lecture.quizzes
    	var components = [];
    	for (let i=0; i<quizzes.length; i++){
    		components.push(<Quiz course_id={this.state.selected_course._id} lecture_id={this.state.selected_lecture.id} quiz={quizzes[i]} quiz_number={i+1} live={this.state.live} show_my_answer={this.state.show_my_answer} show_correct_answer={this.state.show_correct_answer} setShowMyAnswer={this.setShowMyAnswer}/>)
    	}
    	if (components.length == 0){
			components.push(<div style={{textAlign:'center'}}>Belum ada pertanyaan yang terbuka, mohon menunggu...</div>)
		}
    	return components;
    }
    handleChange = name => event => {
    	this.setState({ [name]: event.target.checked });
  	};
  	toggleNew(){
  		this.setState(prevState => {
  			return{new_quiz: !prevState.new_quiz};
  		})
	  }
	
	setShowMyAnswer(state){
		this.setState({
			show_my_answer: state,
		})
	}
  	newQuiz(){
  		window.scrollTo(0,document.body.scrollHeight);
  		this.toggleNew();
  	}
	render(){
		if (!this.state.isLoading){
			return(
				<div>
					{this.state.new_quiz ? 
					<div className='banner' onClick={this.newQuiz}>
						<p> Soal baru telah terbuka, tekan tombol ini </p>
						<Logo color='white' size='logo' background='trans' padding={false} style={{width:'2rem', margin:'auto'}}/>
					</div>
					: null}
					<div className='Dashboard'> 
						<DashboardNavigation gradebook={false} course_option={false} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history}/>
					</div>
					<div className='Lecture'>
						<div className='header'>
							<div>
								<h1>{this.state.selected_course.course_name}</h1>
								<p>Sesi {this.state.selected_lecture.date.split('/')[0] + '/' + this.state.selected_lecture.date.split('/')[1]}</p>
							</div>
							{this.state.live ? null :
							<Popup
									trigger={<IconButton><MoreVertIcon style={{color:'black', padding:'0'}}/></IconButton>}
									position="bottom right"
									on = "click"
									arrow = {false}
									contentStyle={{background: '#FFFFFF',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
									offsetY={-40}
								>
									{close => (
										<div className='popup'>
											<div className='popup-options'><p>Jawaban Anda</p><Checkbox checked={this.state.show_my_answer} onChange={this.handleChange('show_my_answer')} style={{padding:'0px', color:'black'}}/></div>
											<div className='popup-options'><p>Jawaban Benar</p><Checkbox checked={this.state.show_correct_answer} onChange={this.handleChange('show_correct_answer')} style={{padding:'0px', color:'black'}}/></div>
											<div className='popup-options'><p>Unduh</p><div><IconButton style={{color:'	#E22819', padding:'0.25rem'}}><FaFilePdf style={{margin:'auto'}}/></IconButton> <IconButton style={{color:'#4889FA', padding:'0.25rem'}}><FaFileWord style={{margin:'auto'}}/></IconButton></div></div>
										</div>
									)}							
							</Popup>
							}    
							
						</div>
						<div className='quizzes'>
							{this.makeQuizzes()}
						</div>
				    </div>
				</div>
			)
		}
		else{
			return null
		}	
	}
}

export class Quiz extends Component{
	constructor(props){
		super(props);
		this.state={
			answer: null
		}
		this.answerQuiz = this.answerQuiz.bind(this);
	}
	style(){
		if (this.props.quiz.live){
			return 'live-answer'
		}
		else{
			return 'non-live-answer'
		}
	}
	async answerQuiz(i){
		// event.preventDefault();
		// console.log(i)
		if (this.props.quiz.live){
			this.props.setShowMyAnswer(true);
			var ans = parseInt(i);
			await this.setState({
				answer : ans,
			})
			console.log(this.state.answer)
			socket.emit("answer_question", {
				lecture_id: this.props.lecture_id,
				quiz_id: this.props.quiz.id,
				quiz_answer: ans 
			});
		}

	}
	makeAns(){
		var answers = this.props.quiz.answers;
		let components = [];
		var my_answer = this.state.answer
		if (this.state.answer === null){
			my_answer = this.props.quiz.student_answer
		}
		
		for (let i=0; i<answers.length; i++){
			if (i == this.props.quiz.correct_answer && (this.props.quiz.show_correct_answer || this.props.show_correct_answer)){
				if ( i == my_answer && this.props.show_my_answer){
					components.push(<div id={i} onClick={()=> this.answerQuiz(i)} className={this.style()} style={{backgroundColor:'#82DAA4', fontWeight:'bold'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
				else{
					components.push(<div id={i} onClick={()=> this.answerQuiz(i)} className={this.style()} style={{backgroundColor:'#82DAA4'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
			}
			else if (i == my_answer && this.props.show_my_answer){
				components.push(<div id={i} onClick={()=> this.answerQuiz(i)} className={this.style()} style={{fontWeight:'bold', border: '1px solid #6311AB'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
			}
			else{
				components.push(<div id={i} onClick={()=> this.answerQuiz(i)} className={this.style()}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
			}
		}
		return components;
	}
	render(){
		return(
			<div className='quiz'> 
				<div className='number'>
					<p> {this.props.quiz_number}. </p>
				</div>
				<div className='content'>
					<p> {this.props.quiz.question} </p>
					<div className='answers'>{this.makeAns()}</div>
				</div>
				<div className='time'>
					<Timer duration={this.props.quiz.time_duration}/>
				</div>
			</div>
		)
	}
}
export default Lecture;