import React, { Component } from 'react';
import './Dashboard.css';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { OverrideMaterialUICss } from "override-material-ui-css";
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import Logo from '../Logo/Logo';
import ReactSlider from 'react-slider';



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
				email: "" 
			},
			selected_course:null,
			selected_lecture:null,
			isLoading: true,
			changingSelectedCourse: false,
		};
		this.changeSelectedLecture = this.changeSelectedLecture.bind(this);
		this.changeSelectedCourse = this.changeSelectedCourse.bind(this);
		this.updateLecturesState = this.updateLecturesState.bind(this);
	}
	updateLecturesState(lectures){
		this.setState({
			lectures: lectures
		})
	}
	async changeSelectedLecture(new_selected_lecture){
		if (new_selected_lecture == "default"){
			this.setState({
				selected_lecture: this.state.lectures[0]
			})
		}
		else{
			this.setState({
				selected_lecture: new_selected_lecture
			})
		}
		
	}
	changeSelectedCourse(new_selected_course){
		this.setState({
			selected_course: new_selected_course,
			isLoading: true,
			changingSelectedCourse: true
		})
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
	      		})
			}	
		}
	}


  	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);

		await this.props.Auth.getData()
  		.then(async res =>{
  			console.log(res)
      		await this.setState({
      			courses: res.data.courses,
      			selected_course: res.data.courses[0],
      			profile:{
      				first_name : res.data.first_name,
      				last_name : res.data.last_name,
      				email: res.data.email,
      				role: res.data.role,
      				school: res.data.school
      			},
      		}, () =>
      		this.props.Auth.getLectures(this.state.selected_course._id)
	      	.then(res =>{
	      		this.setState({
	      			lectures: res.data.lectures,
	      			selected_lecture: res.data.lectures[0],
	      			isLoading: false,
	      		})
	      	})	
	      )
      	})
      	.catch(err =>{
        	console.log(err.message)
      	})

      	
  	}
	render(){
		if (this.props.Auth.loggedIn()){
			if (!this.state.isLoading){
				return(
		    		<div className='Dashboard'>
		    			<DashboardNavigation selected_course={this.state.selected_course} courses={this.state.courses} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history} changeSelectedCourse={this.changeSelectedCourse}/>
						<div style={{display:'flex', flexDirection:'row'}}>
			    			<div className='left'>
			    				<DashboardLeft selectedLecture={this.state.selected_lecture} lectures={this.state.lectures} changeSelectedLecture={this.changeSelectedLecture}  Auth={this.props.Auth} selectedCourseId={this.state.selected_course._id} updateLecturesState={this.updateLecturesState}/>
			    			</div>
			    			<div className='right'>
			    				<DashboardRight selectedLecture={this.state.selected_lecture} changeSelectedLecture={this.changeSelectedLecture} selected_course={this.state.selected_course}  Auth={this.props.Auth} history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} updateLecturesState={this.updateLecturesState}/>
			    			</div>
			    		</div>
		    		</div>
				)
			}
			else{
				return(
				<div>
					<p> data is loading. pls wait </p>
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
	handleChangeLecture(value, event) {
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
	  					<ToggleButton className='button' type='radio' value={lectures[i]} defaultChecked > Sesi {lectures[i].date.split('/')[0]} / {lectures[i].date.split('/')[1]} </ToggleButton>
		  			)
	  			}
	  			else{
	  				toggleButtons.push(
	  					<ToggleButton className='button' type='radio' value={lectures[i]}> Sesi {lectures[i].date.split('/')[0]} / {lectures[i].date.split('/')[1]} </ToggleButton>
	  				)
	  			}
	  		}
	  	}
  		return toggleButtons
  	}
	render(){
		return(
			<div style={{marginLeft:'auto', marginRight:'auto', height:'100%'}}>
				<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' defaultValue={this.props.selectedLecture} onChange={this.handleChangeLecture}>
            		{this.makeToggleButtons(/*[]*/this.state.lectures)}
          		</ToggleButtonGroup>
          		<Popup trigger={<Button className='addButton'> + Tambah Sesi </Button>} modal closeOnDocumentClick={false}>
  					{close => (
  						<div className='popup'>
	  						<div className= "popup-header">
	        					<h2> Tambah Sesi </h2>
		    				</div>
  							<AddLecture changeSelectedLecture={this.props.changeSelectedLecture} closefunction={close} Auth={this.props.Auth} selectedCourseId={this.props.selectedCourseId} updateLecturesState={this.props.updateLecturesState}/>
  						</div>
  					)}			
  				</Popup>
				
			</div>
		)
	}
}

class AddLecture extends Component{
	constructor(props){
		super(props);
		this.state = {
			date: new Date(),
			description:'',
			participation_percentage:'0'
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSliderChange = this.handleSliderChange.bind(this);
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		event.preventDefault();
  		var day = this.state.date.getDate()
  		var month = this.state.date.getMonth() + 1
  		var year = this.state.date.getFullYear()
  		var date  = day + '/' + month + '/' + year
  		this.props.Auth.addLecture(this.props.selectedCourseId, date, this.state.description)
      	.then(res =>{
      		this.props.closefunction()
      		this.props.updateLecturesState(res.data.lectures)
      		this.props.changeSelectedLecture(res.data.lectures[0])
      		alert(date + ' course added')
      		
      	})
      	.catch(err =>{
        	console.log(err.message)
      	})
  	}

  	handleDateChange(date){
  		this.setState({date: date});
  	}

  	handleSliderChange(value){
  		this.setState({participation_percentage: value})
  	}
	render(){
	    return(
	      	<div className="form" style={{paddingLeft:'2rem', paddingRight:'2rem'}}>
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="class_date" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
			            <img src={calIcon} style={{height:'5vh', marginRight:'-5vw'}}/> <ControlLabel style={{marginTop:'1vh', verticalAlign:'middle'}}> Tanggal Kelas </ControlLabel>
			            <DatePicker 
			            	selected={this.state.date}
			            	onChange={this.handleDateChange}
			            	todayButton={'Today'}
			            	dateFormat='d MMMM yyyy'
			            	className='calendar'
			            />

	          		</FormGroup>
	          		<FormGroup>
	          			<ControlLabel> Persentase Nilai </ControlLabel>
	          			<ReactSlider withBars={true} onChange={this.handleSliderChange}/>
	          			<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
	          				<p> Partisipasi: {this.state.participation_percentage}% </p>
	          				<p> Benar: {100 - this.state.participation_percentage}% </p>
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
	          			<Button
	          				className='button'
	          				style={{backgroundColor:'transparent'}}
	          				onClick={this.props.closefunction}>
			          		Batal
			          	</Button>
			          	<Button
				           type="submit"
				           className="button"
				        >
			            Tambah
			          	</Button>
			         </div>
	        	</form>
	      	</div>
	    );
  	}
}

class EditLecture extends Component{
	constructor(props){
		super(props);
		console.log(props)
		this.state = {
			date: this.convertToDateObject(this.props.lecture.date),
			description:this.props.lecture.description,
			participation_percentage: 0, 
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSliderChange = this.handleSliderChange.bind(this);
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}
  	convertToDateObject(str){
  		var split = str.split('/')
  		var date = new Date(split[2], split[1]-1, split[0])
  		return date
  	}
  	convertToString(date){
  		var day = date.getDate()
  		var month = date.getMonth() + 1
  		var year = date.getFullYear()
  		return day + '/' + month + '/' + year
  	}
  	handleSliderChange(value){
  		this.setState({participation_percentage: value})
  	}
  	async handleSubmit(event){
  		event.preventDefault();
  		this.props.Auth.updateLecture(this.props.selected_course_id, this.props.lecture.id, this.convertToString(this.state.date), this.state.description)
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

  	handleDateChange(date){
  		this.setState({date: date});
  	}
	render(){
	    return(
	      	<div className="form">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="class_date" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
			            <img src={calIcon} style={{height:'5vh', margin:'auto'}}/>
			            <DatePicker 
			            	selected={this.state.date}
			            	onChange={this.handleDateChange}
			            	todayButton={'Today'}
			            	dateFormat='d MMMM yyyy'
			            	className='calendar'
			            />

	          		</FormGroup>
	          		<FormGroup>
	          			<ControlLabel> Persentase Nilai </ControlLabel>
	          			<ReactSlider withBars={true} onChange={this.handleSliderChange} defaultValue={this.state.participation_percentage}/> 
	          			<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
	          				<p> Partisipasi: {this.state.participation_percentage}% </p>
	          				<p> Benar: {100 - this.state.participation_percentage}% </p>
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
	          		<Button
				           type="submit"
				           className="button"
				    >
			          Edit
			        </Button>
			         
	        	</form>
	      	</div>
	    );
  	}
}

class CoursesOption extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	createMenuItem(courses, selected_course){
		let length = courses.length
		let result = []

		for (let i=0; i<length; i++){
			if (courses[i].course_name !== selected_course.course_name){
				result.push(<ToggleButton className='button' type='radio' value={courses[i]}> {courses[i].course_name} </ToggleButton>)
			}
		}
		return result;
	}

	handleChange(value, event){
		this.props.changeSelectedCourse(value);
	}
	render(){
		return(
			<Dropdown className='CoursesOption'>
				<Dropdown.Toggle className='toggle-button'> {this.props.selected_course.course_name} </Dropdown.Toggle>
				
				<Dropdown.Menu>
					<ToggleButtonGroup className='buttons' name='lectureDates'type='radio' onChange={this.handleChange}>
						{this.createMenuItem(this.props.courses, this.props.selected_course)}
					</ToggleButtonGroup>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}
class DashboardNavigation extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='navigation'>
				<Logo color='black' size='full' background='trans' padding={false} style={{width:'10rem', margin:'auto'}}/>
				<div style={{display:'flex', justifyContent:'space-between', width:'85%'}}>
					<div>
						<CoursesOption selected_course={this.props.selected_course} courses={this.props.courses} changeSelectedCourse={this.props.changeSelectedCourse}/>
					</div>
					<div style={{display:'flex', marginTop:'auto', marginBottom:'auto'}}>
						<OverrideMaterialUICss><IconButton>
							<OverrideMaterialUICss> <PeopleOutline style={{color: 'black'}}/> </OverrideMaterialUICss>
						</IconButton> </OverrideMaterialUICss>
						<OverrideMaterialUICss><IconButton>
							<OverrideMaterialUICss> <NotificationsOutlined style={{color: 'black'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<ProfileAvatar profile={this.props.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history}/>
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
			live: false,
			//quizzes: this.props.selectedLecture.quizzes,
			//isLoading: true,
		}
		this.toggleLive = this.toggleLive.bind(this)
	}
	async componentDidUpdate(oldProps){
		const newProps = this.props
		if (oldProps.selectedLecture !== newProps.selectedLecture){
			this.setState({
				lecture: newProps.selectedLecture
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
		//if (!this.state.isLoading){
			let quizzesComponent = []
			if (quizzes.length > 0){
				for (let i=0; i<quizzes.length; i++){
					//console.log(quizzes[i])
					quizzesComponent.push(<QuizCard updateLecturesState={this.props.updateLecturesState} changeSelectedLecture={this.props.changeSelectedLecture} quiz={quizzes[i]} question_number={i+1} Auth={this.props.Auth} selected_lecture_id={this.state.lecture.id} selected_course_id={this.props.selected_course._id}/>)
				} 
			} else {
				quizzesComponent.push(<p> You don't have any questions yet! </p>)
			}
			/*this.setState(prevState => {
				return{
					isLoading: !prevState.isLoading
				};
    		})*/
			return quizzesComponent
		/*}
		else{
			return null
		}*/

		
	}
	toggleLive(){
		this.setState(prevState => {
	      return {
	        live: !prevState.live
	      };
	    });
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
				<div className='content'>
					<p> Kelas baru! Buatlah sesi pertama anda </p>
				</div>)
		}
		else{
		return(
			<div>
				<div className='content'>
    				<div className='header'>
    					{this.makingHeader()}
    					{this.liveIndicator()} 
    				</div>
    				<div className='content-option'>
	    				<div className='interactive' onClick={this.toggleLive}>
	    					<OverrideMaterialUICss>
	    						<PlayArrow className='icon'/>
	    					</OverrideMaterialUICss>
	    					<p> Mulai Sesi </p>
	    				</div>
	    				<div className='interactive'>
	    					<Popup trigger={	    								
		    					<IconButton style={{background:'transparent', border:'None'}}>
						    	<OverrideMaterialUICss> <AddIcon className='icon'/> </OverrideMaterialUICss>
							    </IconButton>
							}
								modal
								closeOnDocumentClick={false}
							>
								{close => (<AddQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} Auth={this.props.Auth} course_id={this.props.selected_course._id} lecture_id={this.props.selectedLecture.id} closefunction={close}/>)}			
						  	</Popup>
							<p> Tambah<br/>Pertanyaan </p>
	    				</div>
	    				<div className='interactive'>
	    					<OverrideMaterialUICss> <IconButton style={{background:'transparent', border:'None'}}>
	    						<StatisticIcon className='icon'/>
	    					</IconButton> </OverrideMaterialUICss>
	    					<p> Statistik Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </p>
	    				</div>
	    				<Popup trigger={
		    				<div className='interactive'>
		    					<OverrideMaterialUICss><IconButton style={{background:'transparent', border:'None'}}>
									<SettingsOutlined className='icon'/>
								</IconButton> </OverrideMaterialUICss>
		    					<p> Setting Sesi {this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]} </p>
		    				</div>
		    			} modal closeOnDocumentClick={false}>
		    				{close => (<LectureSetting changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} selected_course={this.props.selected_course} Auth={this.props.Auth} closefunction={close} lecture={this.state.lecture} date={this.state.lecture.date.split("/")[0] + '/' + this.state.lecture.date.split("/")[1]}/>)}
		    			</Popup>
	    			</div>
    						
    				{this.makingQuizzes(this.state.lecture.quizzes)}
    				
    			</div>
			</div>
		)
	}
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
	handleChange(value, event) {
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
  			return(<EditLecture changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} closefunction={this.props.closefunction} lecture={this.props.lecture} Auth={this.props.Auth} selected_course_id={this.props.selected_course._id}/>)
  		}
  		else if (setting =="delete"){
  			return(
  				<div style={{textAlign:'center'}}>
	  				<p> Apakah anda ingin menghapus Sesi {this.props.date}? </p>
	  				<Button onClick={this.deleteLecture}> Iya </Button>
	  				<Button onClick={this.props.closefunction}> Tidak </Button>
  				</div>
  			)
  		}
  		else{
  			return(null)
  		}
  	}
	render(){
		return(
			<div className='popup'>					
				<div className='popup-header'>
					<h2> Setting Sesi {this.props.date}</h2>
					<div >
						<IconButton onClick={this.props.closefunction} ><Close/></IconButton>
					</div>
				</div>
				<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
					<div style={{width:'30%', textAlign:'center'}}>
						<ToggleButtonGroup name='lecture_setting'type='radio' defaultValue={'edit'} style={{display:'flex', flexDirection:'column', textAlign:'center'}} onChange={this.handleChange}>
							<ToggleButton value={'edit'} defaultChecked> Edit Sesi </ToggleButton>
							<ToggleButton value={'delete'}> Hapus Sesi </ToggleButton>
						</ToggleButtonGroup>
					</div>
					<div style={{width:'60%'}}>
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
					<ToggleButtonGroup className='buttons' name='role'type='radio' onChange={this.handleChangeQuestionType}>
						<ToggleButton className='button' value='multiple_choice'> Pilihan Ganda </ToggleButton>
	            		<ToggleButton className='button' value='string_input'> Isian </ToggleButton>
	            		<ToggleButton className='button' value='numeric_input' style={{border:'none'}}> Jawaban Angka </ToggleButton>
	          		</ToggleButtonGroup>
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
		}
		this.deleteQuiz = this.deleteQuiz.bind(this);
		this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
		this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
	}
	async componentDidUpdate(oldProps){
		const newProps = this.props
		if (oldProps.quiz !== newProps.quiz){
			this.setState({
				question: this.props.quiz.question,
				possible_answers: this.props.quiz.answers,
				correct_answer: this.props.quiz.answers[this.props.quiz.correct_answer],
				question_number:this.props.question_number,
			})
		}
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
				answerButtons.push(<ToggleButton className= {this.state.showCorrectAns ? 'answer-correct' : 'answer'}> {String.fromCharCode(i+65)}. {answerArray[i]}</ToggleButton>)
			}
			else{
				answerButtons.push(<ToggleButton className='answer'> {String.fromCharCode(i+65)}. {answerArray[i]}</ToggleButton>)
			}
			
		}
		return answerButtons;
	}

	showSwitch(){
		if (this.state.expanded){
			return(
				<div style={{verticalAlign:'middle', display:'flex', justifyContent:'space-between', marginLeft:'1vw'}}> 
					<Switch onChange={this.toggleSwitch} checked={this.state.showCorrectAns}/>
					<p style={{color: (this.state.showCorrectAns) ? '#82DAA4' : 'grey', margin:'auto', marginLeft:'1vw'}}> Buka Jawaban </p>
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
		})
	}
	render(){
		return(
			<div>
				<Popup
			        open={this.state.showDeleteQuestionModal}
			        modal
			        closeOnDocumentClick={false}
			    >
			       	{close => (
			       	<div className='popup'>
		  				<div className= "popup-header">
		        			<h2> Apakah anda yakin? </h2>
			    		</div>
			    		<div className='buttons' style={{justifyContent:'center'}}>
			    			<Button className='button' onClick={this.deleteQuiz}> Yes </Button>
			    			<Button className='button' onClick={close}> No </Button>
			    		</div>
	  				</div>)
	  				}
			    </Popup>
			    <Popup
			        open={this.state.showUpdateQuestionModal}
			        modal
			        closeOnDocumentClick={false}
			    >
			       	{close => (
				       	<div className='popup'>
			  				<InputQuestion changeSelectedLecture={this.props.changeSelectedLecture} updateLecturesState={this.props.updateLecturesState} index={this.state.question_number - 1}quiz={this.props.quiz} input={'update'} Auth={this.props.Auth} course_id={this.props.selected_course_id} lecture_id={this.props.selected_lecture_id} question_type={this.state.question_type} closefunction={close}/>
		  				</div>
	  				)
	  				}
			    </Popup>


				<OverrideMaterialUICss>
				<Card className='question-card'>
					<OverrideMaterialUICss><CardContent className='card-content'>
						<div>
							<p> {this.state.question_number}. </p>
						</div>
						<div style={{width:'85%'}}>
							<p> {this.state.question} </p>
						</div>

						<IconButton>
							<Popup
								trigger={<MoreVertIcon />}
								position="bottom right"
								on = "click"
								closeOnDocumentClick
							>
								{close => (
									<div onClick={close}>
										<Button onClick={this.toggleUpdateModal} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><Edit style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Edit Pertanyaan </Button>
										<Button onClick={this.toggleDeleteModal} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Hapus Pertanyaan </Button>
									</div>
								)}							
							</Popup>    
					   	</IconButton>
						
					</CardContent> </OverrideMaterialUICss>
					
					<OverrideMaterialUICss><Collapse in={this.state.expanded} timeout='auto' unmountOnExit style={{marginBottom:'2vh'}}>
						<ToggleButtonGroup className='answers' name='lectureDates'type='radio'>
							{this.createAnswerButtons(this.state.possible_answers)}
						</ToggleButtonGroup>
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

						<Button> Live </Button>

					</CardActions></OverrideMaterialUICss>

					
				</Card>
				</OverrideMaterialUICss>
			</div>
		)
	}
}

export default Dashboard;