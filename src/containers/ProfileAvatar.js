import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Popup from 'reactjs-popup';
import './ProfileAvatar.css'

class ProfileAvatar extends Component{
	constructor(props){
		super(props);
		this.state={
			initial: this.props.name.slice(0,1).toUpperCase(),
		}
	}
	render(){
		return(
			<div className='ProfileAvatar'>
				<Popup
					trigger={
						<Button style={{margin:'auto',borderRadius:'50%', background:'red', width:'2vw', height:'2vw', margin:'auto', textAlign:'center'}}>
						{this.state.initial}
						</Button>
					}
					position='bottom right'
					on = 'click'
				>
					<div style={{display:'flex', flexDirection:'row'}}>
						<div>
							<div className='avatar'>
								<p>{this.state.initial}</p>
							</div>
						</div>
						<div style={{borderLeft:'1px solid black', marginLeft:'1vw'}}>
							<p> {this.props.name} </p>
						</div>
					</div>
				</Popup>
			</div>

		)
	}
}

export default ProfileAvatar