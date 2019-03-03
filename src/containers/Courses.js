import React, { Component } from 'react';
import './Courses.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';
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
		};

		this.Auth= this.props.Auth;
		this.toggleShowUpdateCourseModal = this.toggleShowUpdateCourseModal.bind(this)
		this.toggleShowDeleteCourseModal = this.toggleShowDeleteCourseModal.bind(this)
		this.changeShowUpdateCourseModal = this.changeShowUpdateCourseModal.bind(this)
		this.changeshowDeleteCourseModal = this.changeshowDeleteCourseModal.bind(this)
		this.deleteCourse = this.deleteCourse.bind(this)
		
	}

	async componentWillMount(){
    	this.props.props.isNavVisible(true);
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
		        <div >
		            <h1>Mata Kuliah</h1>
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

		        <Grid container
				  direction="row"
				  justify="center"
				  alignItems="baseline"
				  className='content'>

		        	{this.makingCourses(this.state.courses)}
		        
		        	<div>
		        		<Popup
						    trigger={
						    	<Grid item>
							    	<div>
								    	<OverrideMaterialUICss>
								    		<Fab className='fab'>
								    			<AddIcon/>
								    		</Fab>
							    		</OverrideMaterialUICss>
						    		</div>
					    		</Grid>
					    	}
						    modal
						    closeOnDocumentClick={false}
  						>
  						{close => (
  							<div className='course-popup'>
	  							<div className= "course-popup-header">
	        						<h2> Tambah Mata Kuliah </h2>
		    					</div>
  								<AddCourse closefunction={close} Auth={this.Auth}/>
  							</div>
  						)}
  							
  						</Popup>

				    </div>
				</Grid>	
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
			            Tambah
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
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
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
	      course_id: this.props.course._id
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
						<div style={{display:'flex', justifyContent:'flex-end', margin:'0'}}>
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
						<div style={{margin: '2vw',marginBottom: '1vw', marginTop:'3vw'}}>
							<Link to='/dashboard' > {this.state.course_name} </Link>
							<p> {this.state.description} </p>
							<p> {this.state.term} </p>
							<p> {this.state.instructor} </p>
							<br/>
							<p> Kode Bergabung: {this.state.join_code} </p>
						</div>
					
				</CardContent>
			 </Card>
			 </OverrideMaterialUICss>
		)
	}
}





export default withAuth(Courses);