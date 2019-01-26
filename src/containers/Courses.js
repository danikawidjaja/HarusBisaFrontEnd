import React, { Component } from 'react';
import './Page.css';
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





class Courses extends Component{
	constructor(props){
		super(props);

		this.state = {
			courses: this.props.user.courses,
			history: this.props.history,
		};

		this.Auth= this.props.Auth;
		
	}

	makingCourses(listOfCourse){
		let numberOfCourses =listOfCourse.length;
		let coursesComponent = []
		if (numberOfCourses > 0){
			for (let i=0; i<numberOfCourses; i++){
				coursesComponent.push(<Course course={listOfCourse[i]} history={this.state.history}/>)
			} 
		} else {
			coursesComponent.push(<p className="App-caption-text"> You are not enrolled in any course </p>)
		}
		
		return coursesComponent
	}

	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Courses</h2>
		        </div>
		        <div className="course-card-container">
		        	{this.makingCourses(this.state.courses)}
		        
		        	<div>
		        		<Popup
						    trigger={
						    	<Fab color='primary' aria-label='Add'>
					    			<AddIcon/>
					    		</Fab>}
						    modal
  						>
  						{close => (
  							<div>
	  							<div className= "course-popup-header">
	        						<h2 className = "course-popup-title"> Add Course </h2>
	        						<IconButton aria-label="Close" onClick={close}>
          								<CloseIcon />
        							</IconButton>
		    					</div>
  								<AddCourse/>
  							</div>
  						)}
  							
  						</Popup>

				    </div>
					
			    </div>    
		         

        	</div>
		)

	}
}

class AddCourse extends Component{
	constructor(props){
		super(props);
		this.state = {
			join_code: ''
		}
	}
	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
  	}

  	handleSubmit(event){
  		alert(this.state.join_code+' course added')
  	}
	render(){
	    return(
	      	<div className="App-content">
	        	<form onSubmit={this.handleSubmit}>
	          		<FormGroup controlId="join_code" bsSize="large">
	            		<ControlLabel>Join Code</ControlLabel>
			            <FormControl
			              autoFocus
			              type="text"
			              value={this.state.join_code}
			              onChange={this.handleChange}
			            />
	          		</FormGroup>

		          	<Button
			           block
			           bsSize="large"
			           disabled={!this.state.join_code}
			           type="submit"
			           className="button"
			        >
		            Add Course
		          	</Button>
	        	</form>
	      	</div>
	    );
  	}
}


class Course extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      course_code: this.props.course.course_code,
	      course_name: this.props.course.course_name,
	      join_code: this.props.course.join_code,
	      instructors: this.props.course.instructors,
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
			//<OverrideMaterialUICss>
			<Card className='course-card' raised='true'>
				<CardContent>
					<div className='course-card-header'> 
						<h5 className='course-card-title'> {this.state.course_code} </h5>
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
					<p> {this.state.course_name} </p>
					<p> Join code: {this.state.join_code} </p>
					<p> {this.renderInstructor(this.state.instructors)} </p>
				</CardContent>
				<CardActions>
					<Button className='button' onClick={this.handleClick}> Enter course </Button>
				</CardActions>
			 </Card>
			 //</OverrideMaterialUICss>
		)
	}
}

export default withAuth(Courses);