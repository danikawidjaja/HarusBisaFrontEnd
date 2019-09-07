import React, { Component } from 'react';
import './Courses.css'; 
import { Button, FormGroup, FormControl, ControlLabel,Dropdown} from "react-bootstrap";
import { Link} from "react-router-dom";
import withAuth from '../withAuth';
import {Card, CardActions, CardContent, IconButton, Select, OutlinedInput} from "@material-ui/core";
// import {MoreVertIcon, ProfileAvatar, SettingsOutlined, NotificationsOutlined, Edit, Delete, FileCopyOutlined, SearchIcon} from "@material-ui/icons"
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from 'reactjs-popup';
import { OverrideMaterialUICss } from "override-material-ui-css";
import FormControlUI from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import LeftPanelPictureProf from './left_panel_picture_prof.png';
import LeftPanelPictureStud from './left_panel_picture_stud.png';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Error from '../Error/Error';
import { ErrorMessage } from '../Login/Login';
// import OutlinedInput from '@material-ui/core/OutlinedInput';


class Courses extends Component{ 
	constructor(props){
		super(props);
		this.state = {
			courses: this.props.data.courses,
			history: this.props.history,
			showUpdateCourseModal: false,
			courseToUpdate:null,
			showDeleteCourseModal:false,
			courseToDelete:null,
			profile:{
				first_name: this.props.data.first_name,
				last_name: this.props.data.last_name,
				role: this.props.data.role,
				email: this.props.data.email,
				id: this.props.data._id 
			},
			courses_to_show : this.props.data.courses,
			search_bar : ''
		};

		this.Auth= this.props.Auth;
		this.toggleShowUpdateCourseModal = this.toggleShowUpdateCourseModal.bind(this)
		this.toggleShowDeleteCourseModal = this.toggleShowDeleteCourseModal.bind(this)
		this.changeShowUpdateCourseModal = this.changeShowUpdateCourseModal.bind(this)
		this.changeshowDeleteCourseModal = this.changeshowDeleteCourseModal.bind(this)
		this.deleteCourse = this.deleteCourse.bind(this)
		this.updateCoursesState = this.updateCoursesState.bind(this)
		this.findCourses = this.findCourses.bind(this)
		
	}

  	async componentDidMount(){
  		this.props.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	
  	}

  	toggleShowDeleteCourseModal(){
  		this.setState({
  			showDeleteCourseModal: !this.state.showDeleteCourseModal
  		})
  	}
  	toggleShowUpdateCourseModal(){
  		this.setState({
  			showUpdateCourseModal: !this.state.showUpdateCourseModal
  		})
  	}
  	changeshowDeleteCourseModal(courseToBeDeleted){
  		this.toggleShowDeleteCourseModal()
  		this.setState({
  			courseToDelete: courseToBeDeleted,
  		})
  	}
  	changeShowUpdateCourseModal(courseToBeUpdated){
  		this.toggleShowUpdateCourseModal()
  		this.setState({
  			courseToUpdate: courseToBeUpdated,
  		})
  	}
  	deleteCourse(){
  		this.toggleShowDeleteCourseModal()
  		this.Auth.deleteCourse(this.state.courseToDelete._id)
  		.then(res =>{
			alert(this.state.courseToDelete.course_name+' course deleted')
			this.updateCoursesState(res.data.courses)
      	})
      	.catch(err =>{
        	console.log(err.message)
      	})
	  }
	  
	makingCourses(listOfCourse){
		let numberOfCourses =listOfCourse.length;
		let coursesComponent = []
		if (numberOfCourses > 0){
			if (this.state.profile.role == 'faculty'){
				for (let i=0; i<numberOfCourses; i++){
				coursesComponent.push(<ProfCourseCard course={listOfCourse[i]} history={this.state.history} Auth={this.Auth} changeShowUpdateCourseModal={this.changeShowUpdateCourseModal} changeshowDeleteCourseModal={this.changeshowDeleteCourseModal}/>)
				} 
			}
			else{
				for (let i=0; i<numberOfCourses; i++){
					coursesComponent.push(<div className='col-md-6'><StudCourseCard course={listOfCourse[i]} Auth={this.Auth} updateCoursesState={this.updateCoursesState}/></div>)
				}
			}
		} else {
			if (this.state.search_bar == ''){
				coursesComponent.push(this.state.profile.role !== "faculty" ? <p>Anda belum masuk dalam kelas apapun. Hubungi dosen anda.</p> : <p>Buat kelas pertama anda!</p>)
			}
			else{
				coursesComponent.push(<p>Kelas yang anda cari tidak ada.</p>)
			}
		}
		 
		return coursesComponent
	}

	async updateCoursesState(courses){
		await this.setState({
			courses: courses,
			courses_to_show: courses,
			search_bar: ''
		})
	}

	addCourseComponent(close){
		if (this.state.profile.role == 'faculty'){
			return(<UpdateCourse form_type={'add'} closefunction={close} Auth={this.Auth} updateCoursesState={this.updateCoursesState} />)
		}
		else{
			return(<StudentAddCourse closefunction={close} Auth={this.Auth} updateCoursesState={this.updateCoursesState}/>)
		}
	}
	
	findCourses(event){
		var value = event.target.value
		this.setState({
			search_bar: value
		})
		
		var res = []
		value = value.toLowerCase();
		for (let i=0 ; i<this.state.courses.length; i++){
			var courseName = this.state.courses[i].course_name.toLowerCase();
			if (courseName.includes(value)){
				res.push(this.state.courses[i])
			}
		}
		this.setState({
			courses_to_show: res
		})
	}					
	render(){
		return(
	    	<div className="Courses"><div className="row" style={{width:"100%"}}>
	    		<CoursesLeft role={this.state.profile.role} name={this.state.profile.first_name}/>
	    		<div className = 'right col-md-8 order-1'>
	    			<div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
						<OverrideMaterialUICss><IconButton style={{padding:'12px'}}>
							<OverrideMaterialUICss> <SettingsOutlined style={{color: '#9B9B9B'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<OverrideMaterialUICss><IconButton style={{padding:'12px'}}>
							<OverrideMaterialUICss> <NotificationsOutlined style={{color: '#9B9B9B'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<ProfileAvatar profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.props.userHasAuthenticated} history={this.props.history}/>
					</div>
				    <div className='header'>
			            <div class="col-md-4"><h1>Kelas Anda</h1></div>
						<div className="d-none d-md-block col-md-4" style={{margin:"auto 0 auto 0"}}>
							<div className='search-bar'>
								<SearchIcon className='icon'/>
								<input
									type = 'text'
									placeholder='Search'
									value = {this.state.search_bar}
									onChange={this.findCourses}
								/>
							</div>
						</div>
						<div class="col-md-4" style={{margin:'auto', justifyContent:'flex-end', justifyItems:"flex-end"}}>
							<Popup
								trigger={
									<Button className={this.state.profile.role == 'faculty' ? "button" : 'button-student'}> + Tambah Kelas </Button>
								}
								modal
								closeOnDocumentClick={false}
								contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px', padding:'4rem'}}
							>
								{close => (
									<div className='course-popup'>
										<div className= "course-popup-header">
											<h2> Tambah Kelas </h2>
										</div>
										{this.addCourseComponent(close)}
									</div>
								)}		
							</Popup>
						</div>
			        </div>
			        
			        <Popup
			        	open={this.state.showUpdateCourseModal}
			        	modal
			        	closeOnDocumentClick={false}
			        	contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			        >
				        {close => (
							<div className='course-popup'>
								<div className= "course-popup-header">
									<h2> Edit Kelas </h2>
								</div>
								<UpdateCourse form_type={'update'} course={this.state.courseToUpdate} closefunction={close} Auth={this.Auth} toggleShowUpdateCourseModal={this.toggleShowUpdateCourseModal} updateCoursesState={this.updateCoursesState}/>
							</div>
							)
	  					}
			        </Popup>

			        <Popup
			        	open={this.state.showDeleteCourseModal}
			        	modal
			        	closeOnDocumentClick={false}
			        	contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			        >
			        	{close => (
			        		<div className='course-popup'>
			        			<div className='course-popup-header'>
			        				<h2> Apakah anda yakin ingin menghapus kelas {this.state.courseToDelete.course_name}? </h2>
			        			</div>
			        			<div className='buttons' style={{justifyContent:'center'}}>
			        				<Button className='button' style={{margin:'auto'}} onClick={this.deleteCourse}> Iya </Button>
			        				<Button className='button' style={{margin:'auto'}} onClick={this.toggleShowDeleteCourseModal}> Tidak </Button>
			        			</div>
			        		</div>
			        	)}
			        </Popup>
					<div className='content'>
						{this.state.profile.role == 'faculty' ? 
						this.makingCourses(this.state.courses_to_show)
						:
						<div className='row' style={{width: "-webkit-fill-available"}}>
				  			{this.makingCourses(this.state.courses_to_show)}
				  		</div>}
					</div>
	        	</div>
	        </div></div>
		)
	}
}


class CoursesLeft extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className='left col-md-4 order-2'>
				<div style={{padding:'2rem'}}>
					<h2> Selamat Datang ke HarusBisa, <br/> {this.props.name[0].toUpperCase() + this.props.name.slice(1, this.props.name.length)} </h2>
    			</div>
    			{this.props.role == 'faculty' ? <img className='image' src={LeftPanelPictureProf}/> : <img className='image' src={LeftPanelPictureStud}/>}
    		</div>
		)
	}
}

class TermDropdown extends Component{
	constructor(props){
		super(props);
		this.state={
			month:this.props.month,
			year:this.props.year,
		}
		this.handleChange = this.handleChange.bind(this)
	}

	stringify(){
		return (this.state.month + ' ' + this.state.year)
	}

	handleChange = name => async event =>{
		await this.setState({[name] : event.target.value})
		let term = this.stringify();
		this.props.handleChange(term);
	};

	makeYearOptions(){
		var currentYear = new Date()
		currentYear = currentYear.getFullYear()
		var components = []
		var endYear = currentYear + 6

		while (currentYear < endYear){
			var string = currentYear.toString()
			components.push(<option value={string}>{string}</option>)
			currentYear = currentYear + 1
		}
		return components
	}
	render(){
		return(
			<div style={{display:'flex', flexDirection:'column', alignText:'left'}}>
			<label style={{textAlign:'left'}}> {this.props.label} </label>
			<div style={{display:'flex', flexDirection:'row'}}>
			<FormControlUI>
				<OverrideMaterialUICss>  			
		        <Select 
		        	native
		        	value={this.state.month}
		        	onChange={this.handleChange('month')}
		        	inputProps={{
		        		name:'month',
		        		id:'month'
					}}
					className='dropdown'
					input={
						<OutlinedInput id="outlined-age-native-simple" />
					}
		        >
		        	<option value=""/>
		        	<option value={'January'}> Januari </option>
		          	<option value={'February'}> Februari </option>
		          	<option value={'March'}> Maret </option>
		          	<option value={'April'}> April </option>
		          	<option value={'May'}> Mei </option>
		          	<option value={'June'}> Juni </option>
		          	<option value={'July'}> Juli </option>
		          	<option value={'August'}> Agustus </option>
		          	<option value={'September'}> September </option>
		          	<option value={'October'}> Oktober </option>
		          	<option value={'November'}> November </option>
		          	<option value={'December'}> Desember </option>
		         </Select>
		         </OverrideMaterialUICss>
		    </FormControlUI>
			
			{/* <p style={{fontWeight:'500', letterSpacing:'1.8px', margin:'auto', marginLeft:'1rem'}}>{this.state.year}</p> */}
		    <FormControlUI>
		    	<Select
		    		native
		    		value={this.state.year}
		    		onChange={this.handleChange('year')}
		    		inputProps={{
		    			name:'year',
		    			id:'year'
					}}
					className='dropdown'
					input={
						<OutlinedInput id="outlined-age-native-simple" />
					}
		    	>
		    		<option value=""/>
					{this.makeYearOptions()}
		    	</Select>
		    </FormControlUI>
		    </div>
		    </div>
		)
	}
}

TermDropdown.defaultProps={
	month: "",
	year: new Date().getFullYear()
}

function nameFormatting(name){
	var names = name.split(" ")
	var first_name = names[0][0].toUpperCase() + names[0].slice(1,names[0].length)
	var last_name = names[1][0].toUpperCase() + names[1].slice(1,names[1].length)
	return first_name + " " + last_name
}

class StudentAddCourse extends Component{
	constructor(props){
		super(props);
		this.state={
			join_code:'',
			haveSubmited:false,
			course: null,
			error: null,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddClass = this.handleAddClass.bind(this);
		this.toggleHaveSubmited = this.toggleHaveSubmited.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();		
		this.props.Auth.getCourse(this.state.join_code)
		.then(async res => {
			await this.setState({
				course: res.data,
				haveSubmited: true
			})
		})
		.catch(error =>{
			console.log(error)
			this.setState({
				error: error
			})
		})
	}
	
	toggleHaveSubmited(){
		this.setState(prevState =>{
			return{
				haveSubmited: !prevState.haveSubmited,
			}
		})
	}
	handleAddClass(event){
		event.preventDefault();
		this.props.Auth.studentAddCourse(this.state.join_code)
		.then(res => {
			this.props.closefunction()
			this.props.updateCoursesState(res.data.courses)
		})
		.catch(err =>{
        	console.log(err.message)
		})
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
	}
	render(){
		if (this.state.haveSubmited && this.state.course != null){
			return(
				<div style={{textAlign:'left'}}>
					<StudCourseCard course={this.state.course} disableLink={true}/>
					<div class='buttons'>
						<Button className='transparent-button' onClick={this.props.closefunction}>Batalkan</Button>
						<Button className='student-button' onClick={this.handleAddClass}>Tambahkan</Button>
					</div>
				</div>
			)
		}
		else{
			return(
				<div className="form">
					{this.state.error && <ErrorMessage msg={"Maaf, kami tidak dapat menemukan kelas ini. Tolong coba lagi."}/>}
					<form onSubmit={this.handleSubmit}>
						<FormGroup controlId="join_code">
							<ControlLabel>Kode Bergabung</ControlLabel>
							<FormControl
							autoFocus
							type="text"
							value={this.state.join_code}
							onChange={this.handleChange}
							
							/>
						</FormGroup>
						<div className='buttons'>
							<Button
								className='transparent-button'
								onClick={this.props.closefunction}>
								Batal
							</Button>
							<Button
							type="submit"
							className="student-button"
							>
							Tambah
							</Button>
						</div>
					</form>
				</div>
			);
		}
  	}
}
class UpdateCourse extends Component{
	constructor(props){
		super(props);
		this.state = {
			course_name:this.props.course.course_name,
			start_term:this.props.course.start_term,
			end_term: this.props.course.end_term,
			description:this.props.course.description,
			id: this.props.course._id,
			form_type: this.props.form_type
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeStartTerm = this.changeStartTerm.bind(this);
		this.changeEndTerm = this.changeEndTerm.bind(this);
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
	  }
	
	changeStartTerm(start_term){
		this.setState({
			start_term: start_term
		})
	}

	changeEndTerm(end_term){
		this.setState({
			end_term: end_term
		})
	}
  	handleSubmit(event){
		event.preventDefault();
		if (this.state.form_type == 'update'){ 
			this.props.Auth.updateCourse(this.state.id, this.state.course_name, this.state.start_term, this.state.end_term, this.state.description)
			.then(res =>{
				this.props.closefunction()
				this.props.toggleShowUpdateCourseModal()
				alert(this.state.course_name+' course updated')
				this.props.updateCoursesState(res.data.courses)
			})
			.catch(err =>{
				console.log(err.message)
			})
		}
		else if (this.state.form_type == 'add'){
			this.props.Auth.addCourse(this.state.course_name, this.state.start_term, this.state.end_term, this.state.description)
			.then(res =>{
				this.props.closefunction()
				alert(this.state.course_name+' course added')
				this.props.updateCoursesState(res.data.courses)
			})
			.catch(err =>{
				console.log(err.message)
			})
		}
		else{
			console.log('error.')
		}
  	}


	render(){
	    return(
	      	<div className="form">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="course_name">
	            		<ControlLabel>Nama Kelas</ControlLabel>
			            <FormControl
			              autoFocus
			              type="text"
			              value={this.state.course_name}
			              onChange={this.handleChange}
			              placeholder = 'Biologi kelas A'
			            />
	          		</FormGroup>
					
					<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'1rem'}}> 
						<TermDropdown label={'Mulai Kelas'} id={'start_term'} handleChange={this.changeStartTerm} month={this.state.start_term.split(" ")[0]} year={this.state.start_term.split(" ")[1]}/>
						<p style={{margin:'auto', marginTop:'1.5rem'}}>-</p>
						<TermDropdown label={'Akhir Kelas'} id={'end_term'} handleChange={this.changeEndTerm} month={this.state.end_term.split(" ")[0]} year={this.state.end_term.split(" ")[1]}/>
					</div>
	          		
	          		<FormGroup controlId="description">
	            		<ControlLabel>Deskripsi</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.description}
			              onChange={this.handleChange}
			              placeholder= '(optional)'
			            />
	          		</FormGroup>

	          		<div className='buttons'>
	          			<Button
	          				className='button'
	          				style={{backgroundColor:'transparent'}}
	          				onClick={this.state.form_type == "update" ? this.props.toggleShowUpdateCourseModal : this.props.closefunction}>
			          		Batal
			          	</Button>
			          	<Button
				           type="submit"
				           className="button"
				        >
			            {this.state.form_type == 'update' ? "Ganti" : "Tambah"}
			          	</Button>
			         </div>
	        	</form>
	      	</div>
	    );
  	}
}

UpdateCourse.defaultProps={
	course:{
		course_name:'',
		start_term:"",
		end_term:"",
		description:"",
		id:""
	}
}

function translateToIndo(string){
	var month = string.split(" ")[0]
	var year = string.split(" ")[1]
	var dict = {
		'January' : 'Januari',
		'February' : 'Februari',
		'March' : 'Maret',
		'May' : 'Mei',
		'June' : 'Juni',
		'July' : 'Juli',
		'August' : 'Agustus',
		'October' : 'Oktober',
		'December' : 'Desember'
	}
	if (month in dict){
		month = dict[month]
	}

	return month + " " + year
}
class ProfCourseCard extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      	course_name: this.props.course.course_name,
	      	join_code: this.props.course.join_code,
	      	start_term: this.props.course.start_term,
	      	end_term: this.props.course.end_term,
	      	description: this.props.course.description,
	      	course_id: this.props.course._id,
	      	num_student:this.props.course.number_of_students,
	      	num_lecture: this.props.course.number_of_lectures,
	    };  

	    this.handleClick = this.handleClick.bind(this);
	    this.deleteCourse = this.deleteCourse.bind(this);
	    this.updateCourse = this.updateCourse.bind(this);
	}
	  
  	handleClick(){
  		this.props.history.push('/lectures');
  	}

  	deleteCourse(){
      	this.props.changeshowDeleteCourseModal(this.props.course)
  	}

  	updateCourse(){
  		this.props.changeShowUpdateCourseModal(this.props.course)
  	}

  	async componentDidUpdate(oldProps) {
		const newProps = this.props
  		if (oldProps.course.course_name !== newProps.course.course_name){
  			this.setState({
  				course_name: newProps.course.course_name
  			})
  		}

  		if (oldProps.course.join_code !== newProps.course.join_code){
  			this.setState({
  				join_code: newProps.course.join_code
  			})
  		}
  		if (oldProps.course.start_term !== newProps.course.start_term){
  			this.setState({
  				start_term: newProps.course.start_term
  			})
  		}
  		if (oldProps.course.end_term !== newProps.course.end_term){
  			this.setState({
  				end_term: newProps.course.end_term
  			})
  		}
  		if (oldProps.course.description !== newProps.course.description){
  			this.setState({
  				description: newProps.course.description
  			})
  		}
  		if (oldProps.course.number_of_lectures !== newProps.course.number_of_lectures){
  			this.setState({
  				num_lecture: newProps.course.number_of_lectures
  			})
  		}
  		if (oldProps.course.number_of_students !== newProps.course.number_of_students){
  			await this.setState({
  				num_student: newProps.course.number_of_students
  			})
  		}
  		
	}

  	render(){
  		
		return(
			<OverrideMaterialUICss>
			<Card className='course-card' raised='true'>
				<CardContent>
						<div className="row" style={{margin:'1.5rem'}}>
							<div className="col-5">
								<Link to={'/dashboard/'+ this.state.course_id} > {this.state.course_name} </Link>
								<p> {translateToIndo(this.state.start_term)} - {translateToIndo(this.state.end_term)} </p>
								<p> Kode Bergabung: {this.state.join_code} </p>
							</div>

							<div className='col-5'>
								<div className="row">
									<div className='col' style={{color:'black', textAlign:'center'}}>
										<h4>{this.state.num_student}</h4>
										<p>Mahasiswa</p>
									</div>
									<div className='col' style={{color:'black', textAlign:'center'}}>
										<h4>{this.state.num_lecture}</h4>
										<p>Sesi</p>
									</div>
								</div>
							</div>
							<div className='col-2'>
								<IconButton>
									<Popup
										trigger={<MoreVertIcon />}
										position="bottom right"
										on = "click"
										closeOnDocumentClick
										arrow={false}
										contentStyle={{borderRadius:'8px', boxShadow:'0px 4px 4px rgba(0,0,0,0.25)'}}
										mouseLeaveDelay={1}
									>
										{close => (
											<div onClick={close}>
												<Button onClick={this.updateCourse} style={{border:'none', display:'flex', width:'100%', padding:'2px 12px'}}> <OverrideMaterialUICss><Edit style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Edit Kelas </Button>
												<Button onClick={close} style={{border:'none', display:'flex', width:'100%', padding:'2px 12px'}}> <OverrideMaterialUICss><FileCopyOutlined style={{marginRight:'1rem'}}/></OverrideMaterialUICss>Lihat Daftar Nilai </Button>
												<Button onClick={this.deleteCourse} style={{border:'none', display:'flex', width:'100%', padding:'2px 12px'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Hapus Kelas </Button>
											</div>
										)}							
									</Popup>    
					        	</IconButton>
							</div>	
						</div>
				</CardContent>
			 </Card>
			 </OverrideMaterialUICss>
		)
	}
}
class StudCourseCard extends Component{
	constructor(props){
		super(props)
		this.state={
			showDeleteCourseModal: false,
		}
		this.toggleShowDeleteCourseModal = this.toggleShowDeleteCourseModal.bind(this);
		this.deleteCourse = this.deleteCourse.bind(this);
	}

	toggleShowDeleteCourseModal(){
		this.setState({
			showDeleteCourseModal: !this.state.showDeleteCourseModal,
		})
	}

	deleteCourse(){
		this.props.Auth.studentDeleteCourse(this.props.course._id)
		.then(res =>{
			this.toggleShowDeleteCourseModal();
			this.props.updateCoursesState(res.data.courses)
		})
		.catch(err =>{
        	console.log(err.message)
      	})
	}
	render(){
		return(
			<div >
				<Popup
			       	open={this.state.showDeleteCourseModal}
			       	modal
			       	closeOnDocumentClick={false}
			       	contentStyle={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '8px'}}
			    >
			       	{close => (
			       		<div className='course-popup'>
			       			<div className='course-popup-header'>
			       				<h2> Apakah anda yakin ingin menghapus kelas? </h2>
			       			</div>
			       			<div className='buttons' style={{justifyContent:'center'}}>
			       				<Button className='student-button' style={{margin:'auto'}} onClick={this.deleteCourse}> Iya </Button>
			       				<Button className='student-button' style={{margin:'auto'}} onClick={this.toggleShowDeleteCourseModal}> Tidak </Button>
			       			</div>
			       		</div>
			       	)}
			    </Popup>
				
				<Card raised='true' className='student-course-card'>
					<CardContent className='student-course-card-content'>
						<div className='info col-10'>
							{!this.props.disableLink && <Link to={{pathname:'/student-dashboard/' + this.props.course._id}}>{this.props.course.course_name}</Link>}
							{this.props.disableLink && <p className="class-name">{this.props.course.course_name}</p>}
							<p>Dosen/Pembimbing: {nameFormatting(this.props.course.instructor)}</p>
							<p>{translateToIndo(this.props.course.start_term)} - {translateToIndo(this.props.course.end_term)}</p>
							<p>Kode Bergabung: {this.props.course.join_code}</p>
						</div>
						<div className='col-2' style={{justifyContent:'flex-end', margin:'0'}}>
							<IconButton>
								<Popup
									trigger={<MoreVertIcon />}
									position="bottom right"
									on = "click"
									closeOnDocumentClick
									arrow={false}
									contentStyle={{borderRadius:'8px', boxShadow:'0px 4px 4px rgba(0,0,0,0.25)'}}
									mouseLeaveDelay={1}
								>
									{close => (
										<div onClick={close}>
											<Button onClick={this.toggleShowDeleteCourseModal} style={{border:'none', display:'flex', width:'100%'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Hapus Kelas </Button>
										</div>
									)}							
								</Popup>    
					        </IconButton>
						</div>
					</CardContent>
					<OverrideMaterialUICss><CardActions className='student-course-card-action'>
					<p> {this.props.course.number_of_lectures} Sesi</p>
					</CardActions></OverrideMaterialUICss>
				</Card>
			</div>
		)
	}
}





export default withAuth(Courses);