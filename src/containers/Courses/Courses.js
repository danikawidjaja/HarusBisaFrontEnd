import React, { Component } from 'react';
import './Courses.css'; 
import { Button, FormGroup, FormControl, ControlLabel,Dropdown} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from '../withAuth';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from 'reactjs-popup';
import CloseIcon from '@material-ui/icons/Close';
import { OverrideMaterialUICss } from "override-material-ui-css";
import GridLayout from 'react-grid-layout';
import FormControlUI from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import LeftPanelPictureProf from './left_panel_picture_prof.png';
import LeftPanelPictureStud from './left_panel_picture_stud.png';
import Edit from '@material-ui/icons/Edit';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Delete from '@material-ui/icons/Delete';
import Logo from '../Logo/Logo';
import ReactSearchBox from 'react-search-box';


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
			courses_name: []
		};

		this.Auth= this.props.Auth;
		this.toggleShowUpdateCourseModal = this.toggleShowUpdateCourseModal.bind(this)
		this.toggleShowDeleteCourseModal = this.toggleShowDeleteCourseModal.bind(this)
		this.changeShowUpdateCourseModal = this.changeShowUpdateCourseModal.bind(this)
		this.changeshowDeleteCourseModal = this.changeshowDeleteCourseModal.bind(this)
		this.deleteCourse = this.deleteCourse.bind(this)
		this.updateCoursesState = this.updateCoursesState.bind(this)
		
	}

  	async componentDidMount(){
  		this.props.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	var temp_class = []
		for (let i=0; i<this.state.courses.length; i++){
			var temp = {value: this.state.courses[i].course_name, key: this.state.courses[i].course_name}
			temp_class.push(temp)
		}
		this.setState({
			courses_name: temp_class
		})
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
      		this.setState({
      			courses: res.data.courses
      		})
      	})
      	.catch(err =>{
        	console.log(err.message)
      	})
  	}
	makingCourses(listOfCourse){
		let numberOfCourses =listOfCourse.length;
		let coursesComponent = []
		if (numberOfCourses > 0){
			if (this.state.profile.role == 'professor'){
				for (let i=0; i<numberOfCourses; i++){
				coursesComponent.push(<ProfCourseCard course={listOfCourse[i]} history={this.state.history} Auth={this.Auth} changeShowUpdateCourseModal={this.changeShowUpdateCourseModal} changeshowDeleteCourseModal={this.changeshowDeleteCourseModal}/>)
				} 
			}
			else{
				for (let i=0; i<numberOfCourses; i++){
					coursesComponent.push(<StudCourseCard course={listOfCourse[i]} Auth={this.Auth} updateCoursesState={this.updateCoursesState} data-grid={{x: i, y: i, w: 1, h: 1, static: true}}/>)
				}
			}
		} else {
			coursesComponent.push(<p> You are not enrolled in any course </p>)
		}
		
		return coursesComponent
	}

	updateCoursesState(courses){
		this.setState({
			courses: courses,
		})
	}

	addCourseComponent(close){
		if (this.state.profile.role == 'professor'){
			return(<AddCourse closefunction={close} Auth={this.Auth} updateCoursesState={this.updateCoursesState} />)
		}
		else{
			return(<StudentAddCourse closefunction={close} Auth={this.Auth} updateCoursesState={this.updateCoursesState}/>)
		}
	}
	
	findCourses(value){
		let found = false
		for (let i=0 ; i<this.state.courses.length; i++){
			if (this.state.courses[i].course_name.includes(value)){
				console.log(this.state.courses[i])
				found = true
			}
		}
		if (!found){
			console.log('not found')
		}
	}					
	render(){
		console.log(this.state.courses_name)
		return(
	    	<div className="Courses">
	    		<CoursesLeft role={this.state.profile.role} name={this.state.profile.first_name}/>
	    		<div className = 'right'>
	    			<div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
						<OverrideMaterialUICss><IconButton>
							<OverrideMaterialUICss> <SettingsOutlined style={{color: '#9B9B9B'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<OverrideMaterialUICss><IconButton>
							<OverrideMaterialUICss> <NotificationsOutlined style={{color: '#9B9B9B'}}/> </OverrideMaterialUICss>
						</IconButton></OverrideMaterialUICss>
						<ProfileAvatar profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.props.userHasAuthenticated} history={this.props.history}/>
					</div>
				        <div style={{display:'flex', flexDirection:'row', marginTop:'52px', justifyContent:'space-between', width:'100%'}} >
			            <h1>Kelas Anda</h1>
			            <ReactSearchBox
			            	placeholder='Search Bar'
			            	style={{margin:'auto'}}
			            	data={this.state.courses_name}
          					onChange={value => this.findCourses(value)}
			            />
			            <Popup
							    trigger={
							    	<Button className={this.state.profile.role == 'professor' ? "button" : 'button-student'}> + Tambah Kelas </Button>
						    	}
							    modal
							    closeOnDocumentClick={false}
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
			        
			        <Popup
			        	open={this.state.showUpdateCourseModal}
			        	modal
			        	closeOnDocumentClick={false}
			        	//onClose={this.toggleShowUpdateCourseModal}
			        >
				        	{close => (
			        	<div className='course-popup'>
		  					<div className= "course-popup-header">
		        				<h2> Edit Kelas </h2>
			    			</div>
	  						<UpdateCourse course={this.state.courseToUpdate} closefunction={close} Auth={this.Auth} toggleShowUpdateCourseModal={this.toggleShowUpdateCourseModal} updateCoursesState={this.updateCoursesState}/>
	  					</div>)
	  					}
			        </Popup>

			        <Popup
			        	open={this.state.showDeleteCourseModal}
			        	modal
			        	closeOnDocumentClick={false}
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
				        <div className= {this.state.profile.role == "professor" ? 'content-prof' : 'content-stud'}>
				        	{/*<GridLayout className="layout" width={1200} autoSize={true} cols={2}>*/}
			        		{this.makingCourses(this.state.courses)}
			        		{/*</GridLayout>*/}
			        		
						</div>
						
	        	</div>
	        </div>
		)
	}
}


class CoursesLeft extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className='left'>
				<div style={{padding:'2rem'}}>
					<h2> Selamat Datang ke HarusBisa, <br/> {this.props.name[0].toUpperCase() + this.props.name.slice(1, this.props.name.length)} </h2>
    			</div>
    			{this.props.role == 'professor' ? <img className='image' src={LeftPanelPictureProf}/> : <img className='image' src={LeftPanelPictureStud}/>}
    		</div>
		)
	}
}
class TermDropdown extends Component{
	constructor(props){
		super(props);
		this.state={
			month:'',
			year:'',
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
	render(){
		return(
			<div style={{display:'flex', flexDirection:'column', alignText:'left'}}>
			<label style={{textAlign:'left'}}> {this.props.label} </label>
			<div>
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
		    <FormControlUI>
		    	<Select
		    		native
		    		value={this.state.year}
		    		onChange={this.handleChange('year')}
		    		inputProps={{
		    			name:'year',
		    			id:'year'
		    		}}
		    	>
		    		<option value=""/>
		    		<option value={'2019'}> 2019 </option>
		    		<option value={'2018'}> 2018 </option>
		    		<option value={'2017'}> 2017 </option>
		    		<option value={'2016'}> 2016 </option>
		    		<option value={'2015'}> 2015 </option>
		    		<option value={'2014'}> 2014 </option>
		    	</Select>
		    </FormControlUI>
		    </div>
		    </div>
		)
	}
}

class StudentAddCourse extends Component{
	constructor(props){
		super(props);
		this.state={
			join_code:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
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
	    return(
	      	<div className="form">
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
	          				className='button'
	          				style={{backgroundColor:'transparent'}}
	          				onClick={this.props.closefunction}>
			          		Batal
			          	</Button>
			          	<Button
				           type="submit"
				           className="button-student"
				        >
			            Tambah
			          	</Button>
			         </div>
	        	</form>
	      	</div>
	    );
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
			id: this.props.course._id
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		event.preventDefault();
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
	          		<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
		          		<FormGroup controlId="start_term">
		            		<ControlLabel>Mulai Kelas</ControlLabel>
				            <FormControl
				              type="text"
				              value={this.state.start_term}
				              onChange={this.handleChange}
				              placeholder= 'Januari 2019'
				            />
		          		</FormGroup>
		          		
		          		<p style={{margin:'auto'}}> - </p>
		          		<FormGroup controlId='end_term'>
		          			<ControlLabel> Akhir Kelas </ControlLabel>
		          			<FormControl
		          				type='text'
		          				value={this.state.end_term}
		          				onChange={this.handleChange}
		          				placeholder='Maret 2019'
		          			/>
		          		</FormGroup>
		          	
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
	          				onClick={this.props.toggleShowUpdateCourseModal}>
			          		Batal
			          	</Button>
			          	<Button
				           type="submit"
				           className="button"
				        >
			            Ganti
			          	</Button>
			         </div>
	        	</form>
	      	</div>
	    );
  	}
}
class AddCourse extends Component{
	constructor(props){
		super(props);
		this.state = {
			course_name:'',
			start_term:'',
			end_term: '',
			description:'',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeEndTerm = this.changeEndTerm.bind(this);
		this.changeStartTerm = this.changeStartTerm.bind(this);
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
	          		<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'2.5vh'}}> 
		          		
		          		
		          		<TermDropdown label={'Mulai Kelas'} id={'start_term'} handleChange={this.changeStartTerm}/>
		          		<p style={{margin:'auto'}}> - </p>
		          		<TermDropdown label={'Akhir Kelas'} id={'end_term'} handleChange={this.changeEndTerm}/>
		          		
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

  	componentDidUpdate(oldProps) {
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
  				num_lecture: newProps.course.num_lecture
  			})
  		}
  		if (oldProps.course.number_of_students !== newProps.course.number_of_students){
  			this.setState({
  				num_student: newProps.course.num_student
  			})
  		}
	}
  	render(){
		return(
			<OverrideMaterialUICss>
			<Card className='course-card' raised='true'>
				<CardContent>
						<div style={{display:'flex', flexDirection:'row', margin: '28px', marginTop:'20px', marginBottom:'20px', flexDirection:'space-between'}}>
							<div>
								<Link to={'/dashboard/'+ this.state.course_id} > {this.state.course_name} </Link>
								<p> {this.state.start_term} - {this.state.end_term} </p>
								<p> Kode Bergabung: {this.state.join_code} </p>
							</div>

							<div style={{display:'flex', flexDirection:'row', margin:'auto'}}>
								<div style={{display:'flex', flexDirection:'column'}}>
									<h4 style={{color:'black', textAlign:'center'}}> {this.state.num_student} </h4>
									<p> Mahasiswa </p>
								</div>
								<div style={{display:'flex', flexDirection:'column', marginLeft:'48px'}}>
									<h4 style={{color:'black', textAlign:'center'}}> {this.state.num_lecture} </h4>
									<p> Sesi </p>
								</div>
							</div>
							<div style={{display:'flex', justifyContent:'space-between', margin:'0'}}>
								<IconButton>
									<Popup
										trigger={<MoreVertIcon />}
										position="bottom right"
										on = "click"
										closeOnDocumentClick
									>
										{close => (
											<div onClick={close}>
												<Button onClick={this.updateCourse} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><Edit style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Edit Kelas </Button>
												<Button onClick={close} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><PlayArrow style={{marginRight:'1rem'}}/></OverrideMaterialUICss>Lihat Daftar Nilai </Button>
												<Button onClick={this.deleteCourse} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Hapus Kelas </Button>
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
						<Link to={{pathname: '/student-dashboard/' + this.props.course._id}}> {this.props.course.course_name} </Link>
						<div style={{display:'flex', justifyContent:'space-between', margin:'0'}}>
								<IconButton>
									<Popup
										trigger={<MoreVertIcon />}
										position="bottom right"
										on = "click"
										closeOnDocumentClick
									>
										{close => (
											<div onClick={close}>
												<Button onClick={this.toggleShowDeleteCourseModal} style={{border:'none', display:'flex'}}> <OverrideMaterialUICss><Delete style={{marginRight:'1rem'}}/></OverrideMaterialUICss> Hapus Kelas </Button>
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