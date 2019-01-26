import React, { Component } from 'react';
import './Page.css';
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';

class Profile extends Component{
	constructor(props){
		super(props);

		this.state = {
			firstname: this.props.user.first_name.slice(0,1).toUpperCase() + this.props.user.first_name.slice(1, this.props.user.first_name.length),
			lastname: this.props.user.last_name.slice(0,1).toUpperCase() + this.props.user.last_name.slice(1, this.props.user.last_name.length),
			email: this.props.user.email,
			courses: this.props.user.courses,
			school: this.props.user.school,
			numberOfCourses: this.props.user.courses.length,
			role: this.props.user.role
		};
		
	}

	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Profile </h2>
		        </div>
		        <div className="App-content">
		        	<p> {this.state.firstname} {this.state.lastname} </p>
		        	<p> {this.state.email} </p>
		        	<p> {this.state.school} </p>
		        	<p> I am a {this.state.role} </p>
		        	<p> Number of courses enrolled: {this.state.numberOfCourses} </p>
		        </div> 
        	</div>
		)

	}
}

export default withAuth(Profile);