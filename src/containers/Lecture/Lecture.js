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
		}
		this.toggleNew = this.toggleNew.bind(this);
		this.newQuiz = this.newQuiz.bind(this);
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

	async componentDidMount(){
		var course_id = this.props.match.params.course_id;
		var lecture_id = this.props.match.params.lecture_id;
		var live = this.props.match.params.live;
		if (live == 0){
			live = false //past session
		}
		else{
			live = true //current session
		}

  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);

      	await this.props.Auth.getData()
  		.then(async res =>{
      		await this.setState({
      			courses: res.data.courses,
      			selected_course: this.findSelected(course_id, res.data.courses, "course"),
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
	      		await this.setState({
	      			selected_lecture: temp,
	      			isLoading: false,
	      			live: live
	      		})
	      		if (live){
	      			var data = {
	      				course_id: this.state.selected_course._id,
	      				lecture_id: temp.id
	      			}
	      			if (socket){
	      				socket.emit("participate_lecture", data)
	      			}
	      		}
	      	})	
	      )
      	})
      	.catch(err =>{
        	console.log(err.message)
        	alert(err.message)
      	})

      	if (!live){
      		if (socket){
      			socket.disconnect();
      			console.log('socket disconnected')
      		}
      	}
      	if (socket && live){
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

    makeQuizzes(){
    	var quizzes = this.state.live ? [] : this.state.selected_lecture.quizzes
    	var components = [];
    	for (let i=0; i<quizzes.length; i++){
    		components.push(<Quiz quiz={quizzes[i]} quiz_number={i+1} live={this.state.live} show_my_answer={this.state.show_my_answer} show_correct_answer={this.state.show_correct_answer}/>)
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
								<button onClick={this.toggleNew}>Toggle New Quiz </button> 
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
	}
	style(){
		if (this.props.live){
			return 'live-answer'
		}
		else{
			return 'non-live-answer'
		}
	}
	makeAns(){
		var answers = this.props.quiz.answers;
		let components = [];
		// pretend the correct answer is my answer since we have no my answer data
		for (let i=0; i<answers.length; i++){
			if (i == this.props.quiz.correct_answer && this.props.show_correct_answer){
				if (this.props.show_my_answer){
					components.push(<div className={this.style()} style={{backgroundColor:'#82DAA4', fontWeight:'bold'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
				else{
					components.push(<div className={this.style()} style={{backgroundColor:'#82DAA4'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
				}
			}
			else if (i == this.props.quiz.correct_answer && this.props.show_my_answer){
				components.push(<div className={this.style()} style={{fontWeight:'bold', border: '1px solid #6311AB'}}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
			}
			else{
				components.push(<div className={this.style()}>{String.fromCharCode(i+65)}. {answers[i]}</div>)
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