import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Popup from 'reactjs-popup';
import './ProfileAvatar.css'

class ProfileAvatar extends Component{
	constructor(props){
		super(props);
		this.state={
			initial: this.props.profile.first_name.slice(0,1).toUpperCase(),
			first_name: this.props.profile.first_name[0].toUpperCase() + this.props.profile.first_name.slice(1, this.props.profile.first_name.length),
			last_name: this.props.profile.last_name[0].toUpperCase() + this.props.profile.last_name.slice(1, this.props.profile.last_name.length),
			email: this.props.profile.email,
		}

	}

	handleLogout = async event => {
	    await this.props.Auth.logout();
	    this.props.userHasAuthenticated(false);
	    this.props.history.push('/');
  	}

  	handleAvatarClick = async event =>{
  		this.props.history.push('/courses');
  	}
	render(){
		return(
			<div className='ProfileAvatar'>
				<Popup
					trigger={
						<Button className='avatar-button'>
						{this.state.initial} 
						</Button>
					}
					contentStyle={{width:'auto'}}
					position='bottom right'
					on = 'click'
				>
					<div style={{display:'flex', flexDirection:'column'}}>
						<div className='popup-profile'>
							<div>
								<div className='avatar' onClick={this.handleAvatarClick}>
									<p>{this.state.initial}</p>
								</div>
							</div>
							<div className='text'>
								<h3> {this.state.first_name + " " + this.state.last_name} </h3>
								<p> {this.state.email} </p>
							</div>
						</div>
						<div>
							<Button onClick={this.handleLogout}> Logout </Button>
						</div>
					</div>
				</Popup>
			</div>

		)
	}
}

export default ProfileAvatar