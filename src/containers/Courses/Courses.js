import React, { Component } from 'react';
import './Courses.css';
import { Button, FormGroup, FormControl, ControlLabel,Dropdown } from "react-bootstrap";
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
import Grid from '@material-ui/core/Grid';
import FormControlUI from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import LeftPanelPicture from './left_panel_picture.png';


class Courses extends Component{ 
	constructor(props){
		super(props);
		console.log(this.props.data)
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
				email: this.props.data.email
			},
		};

		this.Auth= this.props.Auth;
		this.toggleShowUpdateCourseModal = this.toggleShowUpdateCourseModal.bind(this)
		this.toggleShowDeleteCourseModal = this.toggleShowDeleteCourseModal.bind(this)
		this.changeShowUpdateCourseModal = this.changeShowUpdateCourseModal.bind(this)
		this.changeshowDeleteCourseModal = this.changeshowDeleteCourseModal.bind(this)
		this.deleteCourse = this.deleteCourse.bind(this)
		
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
  		console.log('here')
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
  		this.Auth.deleteCourse(this.state.courseToDelete._id)
  		.then(res =>{
      		alert(this.state.courseToDelete.course_name+' course deleted')
      	})
      	.catch(err =>{
        	console.log(err.message)
      	})
  	}
	makingCourses(listOfCourse){
		let numberOfCourses =listOfCourse.length;
		let coursesComponent = []
		if (numberOfCourses > 0){
			for (let i=0; i<numberOfCourses; i++){
				coursesComponent.push(<CourseCard course={listOfCourse[i]} history={this.state.history} Auth={this.Auth} changeShowUpdateCourseModal={this.changeShowUpdateCourseModal} changeshowDeleteCourseModal={this.changeshowDeleteCourseModal}/>)
			} 
		} else {
			coursesComponent.push(<p> You are not enrolled in any course </p>)
		}
		
		return coursesComponent
	}

	render(){
		return(
    		<div className="Courses">
    			<CoursesLeft name={this.state.profile.first_name}/>
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
			            <div>
			            	<p> Search bar </p>
			            </div> 
			            <Popup
							    trigger={
							    	<Button className="button"> + Tambah Kelas </Button>
						    	}
							    modal
							    closeOnDocumentClick={false}
	  						>
	  						{close => (
	  							<div className='course-popup'>
		  							<div className= "course-popup-header">
		        						<h2> Tambah Mata Kuliah </h2>
			    					</div>
	  								<AddCourse closefunction={close} Auth={this.Auth} />
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
		        				<h2> Update Mata Kuliah </h2>
			    			</div>
	  						<UpdateCourse course={this.state.courseToUpdate} closefunction={close} Auth={this.Auth}/>
	  					</div>)
	  					}
			        </Popup>


			        <Popup
			        	open={this.state.showDeleteCourseModal}
			        	modal
			        	closeOnDocumentClick={false}
			        	//onClose={this.toggleShowDeleteCourseModal}
			        >
			        	{close => (
			        		<div>
			        			<h3> Are you sure you want to delete {this.state.courseToDelete.course_name}? </h3>
			        			<Button onClick={this.deleteCourse}> Yes </Button>
			        			<Button onClick={close}> No </Button>
			        		</div>
			        	)}
			        </Popup>

			        <div className= 'content'>
			        	{this.makingCourses(this.state.courses)}
			        	<div>
			        		
					    </div>
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
    			<h2> Selamat Datang ke HarusBisa, <br/> {this.props.name[0].toUpperCase() + this.props.name.slice(1, this.props.name.length)} </h2>
    			<img src={LeftPanelPicture}/>
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
class UpdateCourse extends Component{
	constructor(props){
		super(props);
		this.state = {
			course_name:this.props.course.course_name,
			//start_term:this.props.course.start_term,
			//end_term: this.props.course.end_term,
			term: this.props.course.term,
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
      		alert(this.state.course_name+' course updated')
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
				              value={this.state.term}
				              onChange={this.handleChange}
				              placeholder= 'Januari 2019'
				            />
		          		</FormGroup>
		          		{/*
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
		          	*/}
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
  		console.log(start_term)
  		this.setState({
  			start_term: start_term
  		})
  	}

  	changeEndTerm(end_term){
  		console.log(end_term)
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
class CourseCard extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      course_name: this.props.course.course_name,
	      join_code: this.props.course.join_code,
	      instructor: this.props.course.instructors,
	      term:this.props.course.term,
	      description: this.props.course.description,
	      course_id: this.props.course._id,
	      num_student:'56',
	      num_lecture: '4',
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
  	render(){
		return(
			<OverrideMaterialUICss>
			<Card className='course-card' raised='true'>
				<CardContent>
						<div style={{display:'flex', flexDirection:'row', margin: '28px', marginTop:'20px', marginBottom:'20px', flexDirection:'space-between'}}>
							<div>
								<Link to='/dashboard' > {this.state.course_name} </Link>
								<p> {this.state.term} </p>
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
										<Button onClick={this.deleteCourse}> Delete Course </Button>
										<Button onClick={this.updateCourse}> Update Course </Button>
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





export default withAuth(Courses);