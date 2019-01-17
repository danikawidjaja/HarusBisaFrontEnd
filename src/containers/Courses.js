import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();


class Courses extends Component{
	render(){
		return(
    		<div className="App">
		        <div className="App-header">
		            <h2>Welcome {this.props.user.email}</h2>
		        </div>
		        <p>
		            <button type="button" className="button" onClick={this.handleLogout.bind(this)}>Logout</button>
		        </p>
        	</div>
		)
	}

	handleLogout(){
		Auth.logout()
		console.log(this.props)
		this.props.history.replace('/login')
	}
}

export default withAuth(Courses);