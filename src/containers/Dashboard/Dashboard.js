import React, { Component } from 'react';
import './Dashboard.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'react-table/react-table.css';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { OverrideMaterialUICss } from "override-material-ui-css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StatisticIcon from '@material-ui/icons/Equalizer';
import Collapse from '@material-ui/core/Collapse';
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calIcon from './cal.png';
import InputQuestion from './InputQuestion';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import Logo from '../Logo/Logo';
import ReactSlider from 'react-slider';
import LoadingPage from './LoadingPage';
import Fullscreen from "react-full-screen";
import Live from '../Live/Live';
import socketIOClient from "socket.io-client";
import Timer from '../Timer/Timer';
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import { withStyles } from '@material-ui/core/styles';

export var socket;

const GreenSwitch = withStyles({
  switchBase: {
    color: "#ffffff",
    "&$checked": {
      color: "#82DAA4"
    },
    "&$checked + $track": {
	  backgroundColor: "#82DAA4",
	  color: '#82DAA4'
    }
  },
  checked: {},
  track: {}
})(Switch);

class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			lectures:[],
			courses:[],
			profile:{
				first_name: "",
				last_name: "",
				role: "",
				email: "",
				id:'' 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
			flag: false,
		};
		this.changeSelectedLecture = this.changeSelectedLecture.bind(this);
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this);
		this.updateLecturesState = this.updateLecturesState.bind(this);
		this.changeFlag = this.changeFlag.bind(this);
	}
	changeFlag(){
		this.setState(prevState =>{
			return{
				flag: !prevState.flag
			}
		})
	}
	updateLecturesState(lectures){
		this.setState({
			lectures: lectures
		})
	}
	async changeSelectedLecture(new_selected_lecture){
		if (new_selected_lecture == "default"){
			this.setState({
				selected_lecture: this.state.lectures[0],
			})
		}
		else{
			this.setState({
				selected_lecture: new_selected_lecture,
			})
		}
		
	}
	changeSelectedCourse(new_selected_course){
		this.setState({
			selected_course: new_selected_course,
			isLoading: true,
			changingSelectedCourse: true
		})
		this.props.history.push('/dashboard/'+ new_selected_course._id)
	}
	async componentDidUpdate(prevState){
		if (prevState.selected_course !== this.state.selected_course){
			if (this.state.changingSelectedCourse){
				this.props.Auth.getLectures(this.state.selected_course._id)
	      		.then(res =>{
	      			this.setState({
	      				lectures: res.data.lectures,
	      				selected_lecture: res.data.lectures[0],
	      				isLoading: false,
	      				changingSelectedCourse: false,
	      			})
	      		})
	      		.catch(err => {
	      			console.log(err.message)
	      			alert(err.message)
	      		})
			}	
		}
	}
	findSelectedCourse(id, courses){
		for (let i=0; i<courses.length; i++){
			if (courses[i]._id == id){
				return courses[i];
			}
		}
		return null;
	}

	async initialization(){
		var id = this.props.match.params.id;
		await this.props.Auth.getData()
  		.then(async res =>{
			var selected_course = this.findSelectedCourse(id, res.data.courses)
			if (!selected_course){
				var error = new Error()
				error.message = "Selected course not found"
				throw error
			}
			else{
				await this.setState({
					courses: res.data.courses,
					selected_course: selected_course,
					profile:{
						first_name : res.data.first_name,
						last_name : res.data.last_name,
						email: res.data.email,
						role: res.data.role,
						school: res.data.school,
						id: res.data._id
					},
				}, async () =>
				await this.props.Auth.getLectures(this.state.selected_course._id)
				.then(async res =>{
					await this.setState({
						lectures: res.data.lectures,
						selected_lecture: res.data.lectures.length === 0 ? null : res.data.lectures[0],
						isLoading: false,
					})
  
					if (res.data.lectures[0] != null){
						this.setState({
							live: res.data.lectures[0].live
						})
				  }
				  this.setupSocketConnection();
				})	
			)
			}
      		
      	})
      	.catch(err =>{
        	console.log(err.message)
        	this.props.history.push("/notfound")
		})
	}

	setupSocketConnection(){
		if (!socket){
			socket = socketIOClient('https://www.api.harusbisa.net', {transports : ['websocket']});
			socket.on("connect", () =>{
				if (socket.connected){
					var data = {
						user_id: this.state.profile.id,
						course_id: this.state.selected_course._id
					}
					socket.emit("set_socket_data", data);
					console.log('socket connected')
					socket.on("student_leave", async data =>{
						await socket.emit("remove_student", data);	
					});
				}
				else{
					console.log("error with socket connection");
				}
			})
		}
	}
  	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	window.removeEventListener('scroll', this.props.handleScroll);
		await this.initialization();
  	}

  	
  	async componentWillUnmount(){
  		if (socket){
	    	socket.disconnect()
	    	console.log('socket disconnected')
	    }
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			if (!this.state.isLoading){
				return(
					<React.Fragment>
						<div className="d-none d-lg-block">
							<div className='Dashboard'>
								<DashboardNavigation changeFlag={this.changeFlag} course_option={true} selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
								<div style={{display:'flex', flexDirection:'column', marginTop:'2.97rem'}}>
									<div className='left'>
										<DashboardLeft flag={this.state.flag} changeFlag={this.changeFlag} selectedLecture={this.state.selected_lecture} lectures={this.state.lectures} changeSelectedLecture={this.changeSelectedLecture}  Auth={this.props.Auth} selectedCourseId={this.state.selected_course._id} updateLecturesState={this.updateLecturesState} selectedCourse={this.state.selected_course}/>
									</div>
									<div className='right'>
										<DashboardRight changeLive={this.changeLive} flag={this.state.flag} changeFlag={this.changeFlag} selectedLecture={this.state.selected_lecture} changeSelectedLecture={this.changeSelectedLecture} selected_course={this.state.selected_course}  Auth={this.props.Auth} history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} updateLecturesState={this.updateLecturesState}/>
									</div>
								</div>
							</div>
						</div>
						<div className="d-lg-none">
							<p>Layar anda terlalu kecil. Untuk melihat content ini, silahkan buka di Desktop anda.</p>
						</div>
					</React.Fragment>
				)
			}
			else{
				return(
				<div>
					<LoadingPage/>
				</div>
				)
			}
		}
		else{
			this.props.history.push('/login');
			return(null)
		}
		
	}
}


class DashboardLeft extends Component{
	constructor(props){
		super(props);
		this.state={
			lectures: this.props.lectures,
		}
		this.handleChangeLecture = this.handleChangeLecture.bind(this);
	}
	handleChangeLecture(value) {
		this.props.changeSelectedLecture(value)
  	}

  	async componentDidUpdate(oldProps){
  		if (oldProps.lectures !== this.props.lectures){
  			this.setState({
  				lectures: this.props.lectures
  			})
  		}
  	}

  	makeToggleButtons(lectures){
  		let toggleButtons = []
  		if (lectures.length == 0){
  		}
  		else{
	  		for (let i=0; i<lectures.length; i++){
	  			if (lectures[i] === this.props.selectedLecture){
	  				toggleButtons.push(
	  					<Button className='button-active' value={lectures[i]} onClick={()=> this.handleChangeLecture(lectures[i])}> Sesi {lectures[i].date.split('/')[0]} / {lectures[i].date.split('/')[1]} </Button>
		  			)
	  			}
	  			else{
	  				toggleButtons.push(
	  					<Button className='button' value={lectures[i]} onClick={()=> this.handleChangeLecture(lectures[i])}> Sesi {lectures[i].date.split('/')[0]} / {lectures[i].date.split('/')[1]} </Button>
	  				)
	  			}
	  		}
	  	}
  		return toggleButtons
  	}
	render(){
		return(
			<div style={{width:"100%", height:'100%', justifyContent:'space-between'}}>
				{/* <ToggleButtonGroup className='buttons' name='lectureDates'type='radio' defaultValue={this.props.selectedLecture} onChange={this.handleChangeLecture}>
            		{this.makeToggleButtons(this.state.lectures)}
				  </ToggleButtonGroup> */}
				<div className='buttons'>
            		{this.makeToggleButtons(this.state.lectures)}
          		</div>
          		<Popup 
          		trigger={<Button className='addButton'> + Tambah Sesi </Button>} 
          		modal 
          		closeOnDocumentClick={false}
          		onOpen={this.props.changeFlag}
          		onClose={this.props.changeFlag}
          		contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}>
  					{close => (
  						<div className='popup'>
	  						<div className= "popup-header">
	        					<h2> Tambah Sesi </h2>
		    				</div>
  							<AddEditLecture minDate={this.props.selectedCourse.start_term} maxDate={this.props.selectedCourse.end_term} form_type={'add'} changeSelectedLecture={this.props.changeSelectedLecture} closefunction={close} Auth={this.props.Auth} selectedCourseId={this.props.selectedCourseId} updateLecturesState={this.props.updateLecturesState}/>
  						</div>
  					)}			
  				</Popup>
				
			</div>
		)
	}
}


class AddEditLecture extends Component{
	constructor(props){
		super(props);
		this.state = {
			date: this.props.lecture.date == "" ? this.convertToDateObject(this.props.minDate) : this.convertToDateObject(this.props.lecture.date),
			description:this.props.lecture.description,
			participation_reward_percentage: this.props.lecture.participation_reward_percentage,
			form_type: this.props.form_type,
			minDate:this.convertToDateObject(this.props.minDate),
			maxDate:this.convertToDateObject(this.props.maxDate) 
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSliderChange = this.handleSliderChange.bind(this);
	}

	componentDidMount(){
		var max = this.state.maxDate;
		max.setMonth(max.getMonth() + 1)
		max.setDate(max.getDate() - 1)
		this.setState({
			maxDate:max
		})
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
  	convertToDateObject(str){
		var date;
		if (str != ''){
			var split = str.split('/')
			if (split.length == 3){
				date = new Date(split[2], split[1]-1, split[0]);
			}
			else{
				date = new Date(str)
			}
		}
  		return date
  	}
  	convertToString(date){
  		var day = date.getDate()
  		var month = date.getMonth() + 1
  		var year = date.getFullYear()
  		return day + '/' + month + '/' + year
  	}
  	handleSliderChange(value){
  		this.setState({participation_reward_percentage: value})
  	}
  	async handleSubmit(event){
		event.preventDefault();
		if (this.state.form_type == 'edit'){  
			this.props.Auth.updateLecture(this.props.selected_course_id, this.props.lecture.id, this.convertToString(this.state.date), this.state.description, this.state.participation_reward_percentage)
			.then(res =>{
				this.props.closefunction()
				this.props.updateLecturesState(res.data.lectures)
				for (let i in res.data.lectures){
					if (res.data.lectures[i].id == this.props.lecture.id){
						this.props.changeSelectedLecture(res.data.lectures[i])
					}
				}
			})
		}
		else if (this.state.form_type == 'add'){
			var day = this.state.date.getDate()
			var month = this.state.date.getMonth() + 1
			var year = this.state.date.getFullYear()
			var date  = day + '/' + month + '/' + year
			this.props.Auth.addLecture(this.props.selectedCourseId, date, this.state.description, this.state.participation_reward_percentage)
			.then(res =>{
				this.props.closefunction()
				this.props.updateLecturesState(res.data.lectures)
				this.props.changeSelectedLecture(res.data.lectures[0])
				alert(date + ' course added')
				
			})
			.catch(err =>{
				console.log(err.message)
				alert(err.message)
			})
		}
		else{
			console.log('error')
		}
  	}

  	handleDateChange(date){
  		this.setState({date: date});
  	}
	render(){
	    return(
	      	<div className="form">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="class_date" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
			            <img src={calIcon} style={{height:'5vh', marginTop:'auto', marginBottom:'auto'}}/>
						{this.state.form_type == 'add' ? <p style={{marginTop:'auto', marginBottom:'auto', fontWeight:'500', letterSpacing:'1.8px'}}>Tanggal Kelas</p> : null}
			            <DatePicker 
			            	selected={this.state.date}
			            	onChange={this.handleDateChange}
			            	todayButton={'Today'}
			            	dateFormat='d MMMM yyyy'
							className='calendar'
							minDate={this.state.minDate}
							maxDate={this.state.maxDate}
			            />

	          		</FormGroup>
	          		<FormGroup>
	          			<ControlLabel> Persentase Nilai </ControlLabel>
	          			<ReactSlider onChange={this.handleSliderChange} defaultValue={this.state.participation_reward_percentage}/> 
	          			<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
	          				<p className='slider-text'> Partisipasi: {this.state.participation_reward_percentage}% </p>
	          				<p className='slider-text'> Benar: {100 - this.state.participation_reward_percentage}% </p>
	          			</div>
	          		</FormGroup>

	          		<FormGroup controlId="description" >
	            		<ControlLabel>Deskripsi</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= 'Eg. Anatomi (optional)'
			            />
	          		</FormGroup>
					<div className='buttons'>
						<Button type="submit" className="button">
						{this.state.form_type == 'add' ? 'Tambah' : 'Ganti'}
						</Button>
						{ this.state.form_type == 'add' ? <Button className='button' style={{backgroundColor:'transparent'}} onClick={this.props.closefunction}>Batalkan</Button> : null}
					</div>
			         
	        	</form>
	      	</div>
	    );
  	}
}

AddEditLecture.defaultProps={
	lecture:
	{
		date: "",
		description:'',
		participation_reward_percentage:'0'
	}
}

class CoursesOption extends Component{
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

	handleClick(course){
		this.props.changeSelectedCourse(course);
	}
	createMenuItem(courses, selected_course){
	let length = courses.length
	let result = []

	for (let i=0; i<length; i++){
		if (courses[i].course_name !== selected_course.course_name){
			result.push(<DropdownItem value={courses[i]} onClick={()=>this.handleClick(courses[i])}> {courses[i].course_name} </DropdownItem>)
		}
	}
	return result;
	}
	render() {
		return (
			<Dropdown className='CoursesOption' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
			<DropdownToggle caret className='toggle-button'>
				{this.props.selected_course.course_name}
			</DropdownToggle>
			<DropdownMenu>
				{this.createMenuItem(this.props.courses, this.props.selected_course)}
			</DropdownMenu>
			</Dropdown>
		);
	}
}

export class DashboardNavigation extends Component{
	constructor(props){
		super(props);
		this.toGradebook = this.toGradebook.bind(this);
	}
	
	toGradebook(){
		this.props.history.push('/'+this.props.selected_course._id + '/gradebook')
	}
	render(){
		return(
			<div className='navigation'>
				<Logo color='black' size='full' background='trans' padding={false} style={{marginTop:"0.25rem", height:'1.75rem'}}/>
				<div style={{display:'flex', justifyContent:'space-between', width:'85%'}}>
					<div>
						{this.props.course_option == true ? <CoursesOption changeFlag={this.props.changeFlag} selected_course={this.props.selected_course} courses={this.props.courses} changeSelectedCourse={this.props.changeSelectedCourse}/> : null
						}
					</div>
					<div style={{display:'flex', marginTop:'auto', marginBottom:'auto'}}>
						{this.props.gradebook == null ? <OverrideMaterialUICss><IconButton onClick={this.toGradebook}>
								<OverrideMaterialUICss> <FileCopyOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
							</IconButton> </OverrideMaterialUICss> : null}
						<OverrideMaterialUICss><IconButton>
							<OverrideMaterialUICss> <NotificationsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<ProfileAvatar changeFlag={this.props.changeFlag} profile={this.props.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history}/>
					</div>
				</div>
   			</div>
		)
	}
}
class DashboardRight extends Component{

	constructor(props){
		super(props);
		this.state={
			lecture : this.props.selectedLecture,
			live: this.props.selectedLecture ? this.props.selectedLecture.live : null,
			total_student_in_session:0
		}
		this.startLecture = this.startLecture.bind(this);
		this.stopLecture = this.stopLecture.bind(this);
		this.gettingNumberOfStudentsConnected = this.gettingNumberOfStudentsConnected.bind(this);
	}
	async componentDidUpdate(oldProps){
		const newProps = this.props
		if (oldProps.selectedLecture !== newProps.selectedLecture){
			this.setState({
				lecture: newProps.selectedLecture,
				live: newProps.selectedLecture.live
			})
		}

		this.gettingNumberOfStudentsConnected();
	}
	
	gettingNumberOfStudentsConnected(){
		if (socket){
			socket.on("new_student_join", data =>{
				socket.emit("record_attendance", data)
			})
			socket.on("student_in_session", data =>{
				this.setState({
					total_student_in_session : data.total_student
				})
			})
		}
	}

	
	liveIndicator(){
		if (this.state.live){
			return(
				<div style={{display: 'flex', flexDirection:'row', marginLeft:'5vw'}}>
					<div className='live-indicator' style={{backgroundColor:'#82DAA4'}}> </div>
					<p style={{color:'#82DAA4'}}> Aktif </p>
				</div>
			)
		}
		else{
			return(
				<div style={{display: 'flex', flexDirection:'row', marginLeft:'5vw'}}>
					<div className='live-indicator' style={{backgroundColor:'#828282'}}> </div>
					<p style={{color:'#828282'}}> Baru </p>
				</div>
			)
		}
	}

	makingQuizzes(quizzes){
		let quizzesComponent = []
		if (quizzes.length > 0){
			for (let i=0; i<quizzes.length; i++){
				quizzesComponent.push(<QuizCard course_id={this.props.selected_course._id} lecture_id={this.props.selectedLecture.id} socket={this.props.socket} quizzes={this.state.lecture.quizzes} live={this.state.live} updateLecturesState={this.props.updateLecturesState} changeSelectedLecture={this.props.changeSelectedLecture} quiz={quizzes[i]} question_number={i+1} Auth={this.props.Auth} selected_lecture_id={this.state.lecture.id} selected_course_id={this.props.selected_course._id}/>)
			} 
		} else {
			quizzesComponent.push(<p>You don't have any questions yet!</p>)
		}
		return quizzesComponent
	}

	startLecture(){
		socket.emit("start_lecture",{
			lecture_id: this.state.lecture.id
		})
		socket.on("lecture_is_live", async live =>{
			await this.setState({
				live: live.live
			})
		})
	}

	stopLecture(){
		socket.emit("stop_lecture",{
			lecture_id: this.state.lecture.id
		})
		socket.on("lecture_is_live", async live =>{
			await this.setState({
				live: live.live
			})
			if (this.state.live == false){
				this.setState({
					students_connected:[],
				})
			}
		})
	}


	makingHeader(){
		if (this.state.lecture.description){
			if (this.state.lecture.description == ' '){
				return(<h1> Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </h1>)
			}
			else{
				return(
					<h1> Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} : {this.state.lecture.description}</h1>
				)
			}
		}
		else{
			return(<h1> Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </h1>)
		}
	}

	render(){
		if (!this.state.lecture){
			return(
				<div className='content' style={{zIndex: this.props.flag ? 0 : 1}}>
					<p> Kelas baru! Buatlah sesi pertama anda </p>
				</div>)
		}
		else{
		return(
			<div>
				<div className='content' style={{zIndex: this.props.flag ? 0 : 1}}>
					
    				<div className='header'>
    					{this.makingHeader()}
    					{this.liveIndicator()} 
    				</div>
    				<div className='content-option'>
    					{ this.state.live ? 
    						<div className='interactive' onClick={this.stopLecture}>
    							<Stop className='icon' style={{color:'#FFE01C'}}/>
    							<p> Stop Sesi </p>
    						</div>
    						:
    						<Popup
    						trigger={
			    				<div className='interactive'>
			    					<OverrideMaterialUICss>
			    						<PlayArrow className='icon' style={{color: "#FFE01C"}}/>
			    					</OverrideMaterialUICss>
			    					<p> Mulai Sesi </p>
			    				</div>
			    			}
			    			modal
			    			closeOnDocumentClick={false}
			    			contentStyle={{minHeight:'40vh', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			    			>
			    			{close => (
			    				<div className='popup'>
			    					<div className='popup-header'>
			    						<p>Apakah anda yakin?</p>
			    					</div>
			    					<p style={{marginBottom:'1rem'}}>Dengan memulai sesi, anda akan menghapus semua data dari sesi ini jika sudah pernah dimulai sebelumnya.</p>
			    					<div className='buttons'>
				    					<Button className='button' onClick={this.startLecture}>Iya</Button>
				    					<Button className='button' onClick={close}>Tidak</Button>
				    				</div>
			    				</div>
			    				)
			    			}
			    			</Popup>
		    			}
	    				<div className='interactive'>
	    					<Popup trigger={	    								
		    					<IconButton style={{background:'transparent', border:'None'}}>
						    	<OverrideMaterialUICss> <AddIcon className='icon' style={{color: "#FFE01C"}}/> </OverrideMaterialUICss>
							    </IconButton>
							}
								modal
								closeOnDocumentClick={false}
								contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
							>
								{close => (<AddQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} Auth={this.props.Auth} course_id={this.props.selected_course._id} lecture_id={this.props.selectedLecture.id} closefunction={close}/>)}			
						  	</Popup>
							<p> Tambah<br/>Pertanyaan </p>
	    				</div>

	    				<Popup trigger={
		    				<div className='interactive'>
		    					<OverrideMaterialUICss> <IconButton style={{background:'transparent', border:'None'}}>
		    						<StatisticIcon className='icon' style={{color: "#FFE01C"}}/>
		    					</IconButton> </OverrideMaterialUICss>
		    					<p> Statistik Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </p>
		    				</div>
		    			}
						modal 
						closeOnDocumentClick={false} 
						contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px', minHeight:'40vh'}}
						open={this.state.live}>
		    				{close => (<LectureStat live={this.state.live} number_of_students_connected={this.state.total_student_in_session} total_enrolled_stud={this.props.selected_course.number_of_students} closefunction={close} date={this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]}/>)}
		    			</Popup>


	    				<Popup trigger={
		    				<div className='interactive'>
		    					<OverrideMaterialUICss><IconButton style={{background:'transparent', border:'None'}}>
									<SettingsOutlined className='icon' style={{color: "#FFE01C"}}/>
								</IconButton> </OverrideMaterialUICss>
		    					<p> Setting Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </p>
		    				</div>
		    			} 
		    			modal closeOnDocumentClick={false}
		    			contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px', minheight:'40vh'}}>
		    				{close => (<LectureSetting changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} selected_course={this.props.selected_course} Auth={this.props.Auth} closefunction={close} lecture={this.state.lecture} date={this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]}/>)}
		    			</Popup>
	    			</div>
	    		</div>
    				

    			<div className='quizzes'>		
    				{this.makingQuizzes(this.state.lecture.quizzes)}
    			</div>
    				
    			
			</div>
		)
	}
	}
}

class LectureStat extends Component{
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div className='popup'>
				<div className='popup-header'>
					<p>Statistik Sesi {this.props.date}</p>
					<div >
						<IconButton onClick={this.props.closefunction} ><Close/></IconButton>
					</div>
				</div>
				{ this.props.live ?
					<div>
						<div className='circular-bar'>
						<CircularProgressbarWithChildren 
						value={(this.props.number_of_students_connected/this.props.total_enrolled_stud)*100}
						styles={buildStyles({
						    backgroundColor: "transparent",
						    pathColor: "#FFE01C",
						    trailColor: "#EBEBEB",
						})}
						>
							<h1>{this.props.number_of_students_connected}</h1>
							<p> dari {this.props.total_enrolled_stud}</p>
						</CircularProgressbarWithChildren>
						</div>
						<p>siswa yang sudah masuk kedalam sesi</p>
					</div>
					:
					<div>Sesi sedang tidak live</div>
				}
			</div>
		)
	}
}
class LectureSetting extends Component{
	constructor(props){
		super(props)
		this.state={
			setting:'edit'
		}
		this.handleChange = this.handleChange.bind(this);
		this.deleteLecture = this.deleteLecture.bind(this);
	}
	handleChange(value) {
		this.setState({
			setting:value
		})
  	}
  	deleteLecture(){
  		this.props.Auth.deleteLecture(this.props.selected_course._id, this.props.lecture.id)
  		.then( res => {
  			this.props.closefunction()
  			alert(this.props.lecture.date + "lecture deleted")
  			this.props.updateLecturesState(res.data.lectures)
  			this.props.changeSelectedLecture("default")

  		})
  		.catch(err => {
  			console.log(err.message)
  		})
  	}
  	
  	content(setting){
  		if (setting == 'edit'){
  			return(<AddEditLecture minDate={this.props.selected_course.start_term} maxDate={this.props.selected_course.end_term} form_type={'edit'} changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} closefunction={this.props.closefunction} lecture={this.props.lecture} Auth={this.props.Auth} selected_course_id={this.props.selected_course._id}/>)
  		}
  		else if (setting =="delete"){
  			return(
  				<div style={{textAlign:'center', margin:'auto', paddingBottom:'1rem'}}>
	  				<p> Apakah anda ingin menghapus Sesi {this.props.date}? </p>
	  				<div className='buttons' style={{marginTop:'1rem'}}>
	  					<Button className='button' onClick={this.deleteLecture}> Iya </Button>
	  					<Button className='button' onClick={this.props.closefunction}> Tidak </Button>
	  				</div>
  				</div>
  			)
  		}
  		else{
  			return(null)
  		}
  	}
	render(){
		return(
			<div className='popup' style={{paddingBottom:'2rem'}}>					
				<div className='popup-header'>
					<h2> Setting Sesi {this.props.date}</h2>
					<div >
						<IconButton onClick={this.props.closefunction} ><Close/></IconButton>
					</div>
				</div>
				<div className="row" style={{minHeight:"60vh"}}>
					<div className="col-md-4" style={{marginBottom:'1rem'}}>
						<div style={{textAlign:'center', borderRight:'1px solid #bdbdbd'}}>
							<div  className='vert-buttons'>
								<Button className={ this.state.setting === "edit" ? "vert-button-active":'vert-button'} value={'edit'} onClick={() => this.handleChange("edit")}> Edit Sesi </Button>
								<Button className={ this.state.setting === "delete" ? "vert-button-active":'vert-button'} value={'delete'} onClick={() => this.handleChange("delete")}> Hapus Sesi </Button>
							</div>
						</div>
					</div>
					<div className="col">
						{this.content(this.state.setting)}
					</div>
				</div>
			</div>
		)
	}
}
class AddQuestion extends Component{
	constructor(props){
		super(props)
		this.state={
			question_type: ''
		}
		this.handleChangeQuestionType = this.handleChangeQuestionType.bind(this)
	}

	handleChangeQuestionType(value) {
	    this.setState({
	      question_type: value
	    });
  	}
	popupDisplay(question_type){ 
		let returnComponents = []
		if (question_type === ''){
			returnComponents.push(
				<div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
					<div style={{width:'100%'}}>
					 	<div className='buttons'>
							<Button className='button' onClick={() =>this.handleChangeQuestionType('multiple_choice')}> Pilihan Ganda </Button>
							<Button className='button' onClick={() =>this.handleChangeQuestionType('string_input')}> Isian </Button>
							<Button className='button'  style={{border:'none'}} onClick={() =>this.handleChangeQuestionType('numeric_input')}> Jawaban Angka </Button>
	          			</div>
	          		</div>
	          		<div>
						<IconButton onClick={this.props.closefunction} ><Close/></IconButton>
					</div>
	          	</div>
			)	
		}
		else if (question_type === 'multiple_choice'){
			returnComponents.push(<InputQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} input={'input'} Auth={this.props.Auth} course_id={this.props.course_id} lecture_id={this.props.lecture_id} handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'string_input'){
			returnComponents.push(<InputQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} input={'input'} handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		else if (question_type === 'numeric_input'){
			returnComponents.push(<InputQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} input={'input'} handleChangeQuestionType={this.handleChangeQuestionType} question_type={this.state.question_type} closefunction={this.props.closefunction}/>)
		}
		return(returnComponents)
	}

	render(){
		return(
			<div className='popup'>
				{this.popupDisplay(this.state.question_type)}
			</div>
		)
	}
}
class QuizCard extends Component{
	constructor(props){
		super(props);
		this.state={
			question: this.props.quiz.question,
			possible_answers: this.props.quiz.answers,
			correct_answer: this.props.quiz.answers[this.props.quiz.correct_answer],
			question_number:this.props.question_number,
			question_type:'multiple_choice',
			live: false,
			expanded: false,
			showCorrectAns: false,
			showDeleteQuestionModal: false,
			showUpdateQuestionModal: false,
			isHovering: false,
			time_duration: this.props.quiz.time_duration,
		}
		this.deleteQuiz = this.deleteQuiz.bind(this);
		this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
		this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
		this.handleMouseHover = this.handleMouseHover.bind(this);
		this.changeQuizOrderUp = this.changeQuizOrderUp.bind(this);
		this.changeQuizOrderDown = this.changeQuizOrderDown.bind(this);
		this.goLive = this.goLive.bind(this);
		this.changeDuration = this.changeDuration.bind(this);
	}
	async componentDidUpdate(oldProps){
		const newProps = this.props
		if (oldProps.quiz !== newProps.quiz){
			this.setState({
				question: this.props.quiz.question,
				possible_answers: this.props.quiz.answers,
				correct_answer: this.props.quiz.answers[this.props.quiz.correct_answer],
				question_number:this.props.question_number,
				time_duration:this.props.quiz.time_duration,
			})
		}
	}
	changeDuration(dur){
		this.setState({
			time_duration: dur,
		})
	}
	handleMouseHover(){
		this.setState(prevState =>{
			return{
				isHovering: !prevState.isHovering
			}
		})
	}
	toggleDeleteModal(){
		this.setState(prevState =>{
			return{
				showDeleteQuestionModal: !prevState.showDeleteQuestionModal
			}
		})
	}
	toggleUpdateModal(){
		this.setState(prevState =>{
			return{
				showUpdateQuestionModal: !prevState.showUpdateQuestionModal
			}
		})
	}

	handleExpandClick = () =>{
		this.setState(state => ({expanded: !state.expanded}))
	}
	toggleSwitch = () => {
	    this.setState(prevState => {
	      return {
	        showCorrectAns: !prevState.showCorrectAns
	      };
	    });
	}

	createAnswerButtons(answerArray){
		let answerButtons=[]
		for (let i=0; i<answerArray.length; i++){
			if (answerArray[i] == this.state.correct_answer){
				answerButtons.push(<Button className= {this.state.showCorrectAns ? 'answer-correct' : 'answer'}> {String.fromCharCode(i+65)}. {answerArray[i]}</Button>)
			}
			else{
				answerButtons.push(<Button className='answer'> {String.fromCharCode(i+65)}. {answerArray[i]}</Button>)
			}
			
		}
		return answerButtons;
	}

	showSwitch(){
		if (this.state.expanded){
			return(
				<div style={{verticalAlign:'middle', display:'flex', justifyContent:'space-between', marginLeft:'1vw'}}> 
					<GreenSwitch onChange={this.toggleSwitch} checked={this.state.showCorrectAns}/>
					<p style={{color: '#B2B2B2', margin:'auto', marginLeft:'1vw'}}> Jawaban </p>
				</div>
			)
		}
	}
	async deleteQuiz(){
		this.toggleDeleteModal()
		this.props.Auth.deleteQuiz(this.props.selected_course_id, this.props.selected_lecture_id, this.state.question_number - 1)
		.then( res =>{
			this.props.updateLecturesState(res.data.lectures)
  			for (let i in res.data.lectures){
  				if (res.data.lectures[i].id == this.props.selected_lecture_id){
  					this.props.changeSelectedLecture(res.data.lectures[i])
  				}
  			}
		})
		.catch(err =>{
			console.log(err.message)
			alert(err.message)
		})
	}

	async changeQuizOrderUp(){
		this.handleMouseHover();
		this.props.Auth.changeQuizOrder(this.props.selected_course_id, this.props.selected_lecture_id, this.state.question_number - 1, 'up')
		.then(res =>{
			
			this.props.updateLecturesState(res.data.lectures)
			for (let i in res.data.lectures){
  				if (res.data.lectures[i].id == this.props.selected_lecture_id){
  					this.props.changeSelectedLecture(res.data.lectures[i])
  				}
  			}
		})
		.catch(err =>{
			console.log(err.message)
			
		})
	}

	async changeQuizOrderDown(){
		this.handleMouseHover();
		this.props.Auth.changeQuizOrder(this.props.selected_course_id, this.props.selected_lecture_id, this.state.question_number - 1, 'down')
		.then(res =>{
			
			this.props.updateLecturesState(res.data.lectures)
			for (let i in res.data.lectures){
  				if (res.data.lectures[i].id == this.props.selected_lecture_id){
  					this.props.changeSelectedLecture(res.data.lectures[i])
  				}
  			}
		})
		.catch(err =>{
			console.log(err.message)
		})
	}

	goLive(){
		if (this.props.live){
			this.setState({
				live: true
			})
		}
		else{
			alert('Sesi ini belum live')
		}
	}
	render(){
		return(
			<div>
				<Fullscreen
			          enabled={this.state.live}
			          onChange={live => this.setState({live:live})}
			     	>
			          {this.state.live ? <Live changeDuration={this.changeDuration} lecture_id={this.props.lecture_id} course_id={this.props.course_id} quizzes={this.props.quizzes} quiz={this.props.quiz} question_number={this.state.question_number}/> : null}
			    </Fullscreen>
				<Popup
			        open={this.state.showDeleteQuestionModal}
			        modal
			        closeOnDocumentClick={false}
			        contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			    >
			       	{close => (
			       	<div className='popup'>
		  				<div className= "popup-header">
		        			<h2> Apakah anda yakin? </h2>
			    		</div>
			    		<div className='buttons' style={{justifyContent:'center'}}>
			    			<Button className='button' onClick={this.deleteQuiz}> Yes </Button>
			    			<Button className='button' onClick={this.toggleDeleteModal}> No </Button>
			    		</div>
	  				</div>)
	  				}
			    </Popup>
			    <Popup
			        open={this.state.showUpdateQuestionModal}
			        modal
			        closeOnDocumentClick={false}
			        contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			    >
			       	{close => (
				       	<div className='popup'>
			  				<InputQuestion toggleUpdateModal={this.toggleUpdateModal} changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} index={this.state.question_number - 1}quiz={this.props.quiz} input={'update'} Auth={this.props.Auth} course_id={this.props.selected_course_id} lecture_id={this.props.selected_lecture_id} question_type={this.state.question_type} closefunction={close}/>
		  				</div>
	  				)
	  				}
			    </Popup>

			    <div style={{display:'flex', width:'100%'}}>			    
				    {this.state.isHovering &&
				    	<div className='arrows'>
				    		<IconButton onClick={this.changeQuizOrderUp}> <ExpandLessIcon/> </IconButton>
				    		<IconButton onClick={this.changeQuizOrderDown}> <ExpandMoreIcon/> </IconButton>
				    	</div>
				    }

					<OverrideMaterialUICss>
					<Card className='question-card' onMouseEnter={this.handleMouseHover} onMouseExit={this.handleMouseHover}>
						<OverrideMaterialUICss><CardContent className='card-content'>
							<div>
								<p> {this.state.question_number}. </p>
							</div>
							<div style={{width:'85%'}}>
								<p> {this.state.question} </p>
							</div>

							<IconButton>
								<Popup
									trigger={<MoreVertIcon style={{padding:'0px'}}/>}
									position="bottom right"
									on = "click"
									closeOnDocumentClick
									mouseLeaveDelay={10}
									arrow={false}
									contentStyle={{borderRadius:'8px', boxShadow:'0px 4px 4px rgba(0,0,0,0.25)'}}
								>
									{close => (
										<div onClick={close} >
											<Button onClick={this.toggleUpdateModal} style={{border:'none', display:'flex', width:'100%'}}> <OverrideMaterialUICss><Edit style={{marginRight:'1rem', color:'#FFE01C'}}/></OverrideMaterialUICss> Edit Pertanyaan </Button>
											<Button onClick={this.toggleDeleteModal} style={{border:'none', display:'flex', width:'100%'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem', color:'#FFE01C'}}/></OverrideMaterialUICss> Hapus Pertanyaan </Button>
										</div>
									)}							
								</Popup>    
						   	</IconButton>
							
						</CardContent> </OverrideMaterialUICss>
						
						<OverrideMaterialUICss><Collapse in={this.state.expanded} timeout='auto' unmountOnExit style={{marginBottom:'2vh'}}>
							<div className="answers">
								{this.createAnswerButtons(this.state.possible_answers)}
							</div>
						</Collapse></OverrideMaterialUICss>

						<OverrideMaterialUICss> <CardActions className='card-action' /*style={{justifyContent:'space-between', backgroundColor:'lightgrey'}}*/>
							<div style={{verticalAlign:'middle', display:'flex', justifyContent:'space-between'}}> 
								<OverrideMaterialUICss>
									<IconButton 
										onClick={this.handleExpandClick}
										aria-expanded={this.state.expanded}
										aria-label='Show more'
										className={this.state.expanded ? 'expand-button-expanded' : 'expand-button-normal'}
									>
										<ExpandMoreIcon/>
									</IconButton>
								</OverrideMaterialUICss>
								{this.showSwitch()}
							</div>
							<div style={{display:'flex'}}>
								<Timer duration={this.state.time_duration}/>
								<Button className={!this.props.live ? 'button': 'button hvr-pulse'} onClick={this.goLive}>Live</Button>
							</div>

						</CardActions></OverrideMaterialUICss>

						
					</Card>
					</OverrideMaterialUICss>
				</div>
			</div>
		)
	}
}

export default Dashboard;