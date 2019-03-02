import React, { Component } from 'react';
import './Page.css';
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';

class Profile extends Component{
	constructor(props){
		super(props);

		this.state = {
			firstname: this.props.data.first_name.slice(0,1).toUpperCase() + this.props.data.first_name.slice(1, this.props.data.first_name.length),
			lastname: this.props.data.last_name.slice(0,1).toUpperCase() + this.props.data.last_name.slice(1, this.props.data.last_name.length),
			email: this.props.data.email,
			courses: this.props.data.courses,
			school: this.props.data.school,
			numberOfCourses: this.props.data.courses.length,
			role: this.props.data.role
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