import React, { Component } from 'react';
import './Page.css';
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class Courses extends Component{
	constructor(props){
		super(props);

		this.state = {
			courses: this.props.user.courses,
			history: this.props.history
		};
		
	}

	makingCourses(listOfCourse){
		let numberOfCourses = 1//listOfCourse.length;
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
		console.log(this.props.user);
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Courses</h2>
		        </div>
		        <div className="class-card-container">
		        	{this.makingCourses(this.state.courses)}
		        	<div>
					    <Fab color='primary' aria-label='Add' /*component={Link} to="/"*/>
					    	<AddIcon/>
					    </Fab>
				    </div>
			    </div>    
		         

        	</div>
		)

	}
}

class Course extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      course_code:'BME 352', //this.props.course.course_code
	      course_name:'BME 352 Engineering Biomaterials', //this.props.course.course_name
	      join_code:'886958', // this.props.course.join_code
	      instructors:'Laura Suggs' //this.props.course.instructors
	    };  

	    this.handleClick = this.handleClick.bind(this);
  	}

  	handleClick(){
  		this.props.history.push('/lectures');
  	}


  	render(){
		return(
			<Card className='class-card' raised='true'>
				<CardContent>
					<h5> {this.state.course_code} </h5>
					<p> {this.state.course_name} </p>
					<p> Join code: {this.state.join_code} </p>
					<p> Professor: {this.state.instructors} </p>
				</CardContent>
				<CardActions>
					<Button className='button' onClick={this.handleClick}> Enter course </Button>
				</CardActions>
			 </Card>
		)
	}
}

//export default Courses;
export default withAuth(Courses);