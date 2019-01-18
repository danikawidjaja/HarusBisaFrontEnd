import React, { Component } from 'react';
import './Page.css';
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import withAuth from './withAuth';

class Profile extends Component{
	constructor(props){
		super(props);

		this.state = {
			firstname: this.props.user.first_name,
			lastname: this.props.user.last_name,
			email: this.props.user.email,
			courses: this.props.user.courses,
			school: this.props.user.school,
		};
		
	}

	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2 className="App-header-text">Profile </h2>
		        </div>
		        <div className="App-content">
		        	<p> {this.state.firstname} &nbsp;{this.state.lastname} </p>
		        	<p> {this.state.email} </p>
		        	<p> {this.state.school} </p>
		        </div> 
        	</div>
		)

	}
}

export default withAuth(Profile);