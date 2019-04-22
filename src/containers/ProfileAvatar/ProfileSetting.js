import React, { Component } from 'react';
import {DashboardNavigation} from '../Dashboard/Dashboard';
import  '../Dashboard/Dashboard.css';
import './ProfileSetting.css';
import Logo from '../Logo/Logo';
import { Button, FormGroup, FormControl, ControlLabel, ToggleButton, ToggleButtonGroup } from "react-bootstrap";


class ProfileSetting extends Component{
	constructor(props){
		super(props);
		this.state={
			profile:{
				first_name: "",
				last_name: "",
				role: "",
				email: "" 
			},
			isLoading: false
		};
	}
	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	this.props.Auth.getData()
		.then(res => {
			this.setState({
				profile:{
      				first_name: res.data.first_name[0].toUpperCase() + res.data.first_name.slice(1, res.data.first_name.length),
					last_name: res.data.last_name[0].toUpperCase() + res.data.last_name.slice(1, res.data.last_name.length),
      				email: res.data.email,
      				role: res.data.role,
      				school: res.data.school
      			},
      			isLoading: true
			})
		})
		.catch(err =>{
			console.log(err.message)
		})
    }

    handleSubmit(event){
    	event.preventDefault()
    }

    handleChange = event => {
	    this.setState({
	    	profile:{
	    		[event.target.id]: event.target.value
	    	}
	    });
  	}
	render(){
		if (this.state.isLoading){
			return(
				<div className='Dashboard'> 
					<DashboardNavigation course_option={false} profile={this.state.profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history}/>
			    	<div className='ProfileSetting'>
			    		<h1> Pengaturan Akun </h1>
			    		<div className='content'>
			    			<div className='content-left'>
			    				<div className='avatar'>
			    					<Logo color='black' size='logo' background='trans' padding={false} style={{width:'6rem', margin:'auto'}}/>
			    				</div>
			    			</div>


			    			<div className='content-right'>
			    				<form onSubmit={this.handleSubmit}>
									<FormGroup controlId='first_name' className='form-group'>
										<ControlLabel className='form-group-label'>Nama Depan</ControlLabel>
								            <FormControl
								              type="text"
								              value={this.state.profile.first_name}
								              onChange={this.handleChange}
								              className='form-group-entry'
								            />
								    </FormGroup>

								    <FormGroup controlId='last_name' className='form-group'>
								    	<ControlLabel className='form-group-label'>Nama Belakang</ControlLabel>
								    	<FormControl
								    		type='text'
								    		value={this.state.profile.last_name}
								    		onChange={this.handleChange}
								    		className='form-group-entry'
								    	/>
								    </FormGroup>

								    <FormGroup controlId='school' className='form-group'>
								    	<ControlLabel className='form-group-label'>Universitas</ControlLabel>
								    	<FormControl
								    		type='text'
								    		value={this.state.profile.school}
								    		onChange={this.handleChange}
								    		className='form-group-entry'
								    	/>
								    </FormGroup>
								    <div className='buttons'>
									    <Button
										    type="submit"
										    className="button"
										>
										    Simpan
									    </Button>
								    </div>
						       	</form>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			)
		}
		else{
			return null
		}	
	}
}

export default ProfileSetting;