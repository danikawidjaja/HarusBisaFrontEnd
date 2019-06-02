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
			id: this.props.profile.id,
		}

	}

	handleLogout = async event => {
	    await this.props.Auth.logout();
	    this.props.userHasAuthenticated(false);
	    this.props.history.push('/');
  	}

  	handleSetting = async event =>{
  		this.props.history.push('/profilesetting/'+this.state.id);
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
					onOpen={this.props.changeFlag}
					onClose={this.props.changeFlag}
				>
					<div style={{display:'flex', flexDirection:'column', padding:'0.25rem'}}>
						<div className='popup-profile'>
							<div>
								<div className='avatar'>
									<p>{this.state.initial}</p>
								</div>
							</div>
							<div className='text'>
								<h3> {this.state.first_name + " " + this.state.last_name} </h3>
								<p> {this.state.email} </p>
							</div>
						</div>
						<div className='buttons'>
							<Button className='button' onClick={this.handleSetting}> Edit Profile </Button>
							<Button className='button' onClick={this.handleLogout}> Logout </Button>
						</div>
					</div>
				</Popup>
			</div>

		)
	}
}

ProfileAvatar.defaultProps = {
	changeFlag: () => {}
}
export default ProfileAvatar