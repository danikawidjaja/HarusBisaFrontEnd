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
			courses: this.props.user.courses,
			history: this.props.history,
		};

		this.Auth= this.props.Auth;
		
	}

	async componentWillMount(){
    	this.props.props.isNavVisible(true);
  	}
	makingCourses(listOfCourse){
		let numberOfCourses =listOfCourse.length;
		let coursesComponent = []
		if (numberOfCourses > 0){
			for (let i=0; i<numberOfCourses; i++){
				coursesComponent.push(<CourseCard course={listOfCourse[i]} history={this.state.history}/>)
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
  						>
  						{close => (
  							<div className='course-popup'>
	  							<div className= "course-popup-header">
	        						<h2> Tambah Mata Kuliah </h2>
		    					</div>
  								<AddCourse closefunction={close}/>
  							</div>
  						)}
  							
  						</Popup>

				    </div>
				</Grid>	
        	</div>
		)

	}
}

class AddCourse extends Component{
	constructor(props){
		super(props);
		this.state = {
			join_code: '',
			course_name:'',
			term:'',
			description:''
		}
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		alert(this.state.course_name+' course added')
  	}

  	validateForm(){
  		if (this.state.course_name.length == 0 || this.state.term.length == 0){
  			return false;
  		}
  		else{
  			return true;
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

	          		<FormGroup controlId="term">
	            		<ControlLabel>Mulai Kelas</ControlLabel>
			            <FormControl
			              type="text"
			              value={this.state.term}
			              onChange={this.handleChange}
			              placeholder= 'Januari 2019 - Maret 2019'
			            />
	          		</FormGroup>

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
				           disabled={!this.validateForm()}
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
	      course_code: this.props.course.course_code,
	      course_name: this.props.course.course_name,
	      join_code: this.props.course.join_code,
	      instructors: this.props.course.instructors,
	      term:'Jan 2019 - Mar 2019',
	    };  

	    this.handleClick = this.handleClick.bind(this);
  	}

  	handleClick(){
  		this.props.history.push('/lectures');
  	}

  	renderInstructor(instructors){
  		if (instructors.length > 0){
  			let sentence = 'Instructors: '
  			for (let i=0; i<instructors.length-1; i++){
  				sentence = sentence + instructors[i] + ', '
  			}
  			sentence = sentence + instructors[instructors.length -1];
  			return sentence
  		}
  		else{
  			return 'instructors missing';
  		}
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
								>
									<Popup
										trigger = {<p> Delete course </p>}
										modal
									>
										<p className='app-caption-text'> Are you sure? </p>
										
									</Popup>
								</Popup>    
				        	</IconButton>
						</div>
						<div style={{margin: '2vw',marginBottom: '1vw', marginTop:'3vw'}}>
							<Link to='/dashboard' > {this.state.course_name} </Link>
							<p> {this.state.term} </p>
							<p> {this.renderInstructor(this.state.instructors)} </p>
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