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
			first_name: "",
			last_name: "",
			role: "",
			email: "",
			id:'', 
			isLoading: true,
			old_password:'',
			new_password:'',
			verify_new_password:'',
		};
		this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
		this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	async componentDidMount(){
  		this.props.isNavVisible(false);
    	window.scrollTo(0, 0);
    	var user_id = this.props.match.params.id;
    	this.props.Auth.getUser(user_id)
    	.then(res => {
    		//console.log(res.data._id)
    		this.setState({
    			first_name: res.data.first_name[0].toUpperCase() + res.data.first_name.slice(1, res.data.first_name.length),
				last_name: res.data.last_name[0].toUpperCase() + res.data.last_name.slice(1, res.data.last_name.length),
      			email: res.data.email,
      			role: res.data.role,
      			school: res.data.school,
      			id: res.data._id,
      			isLoading: false,
      			old_password:'',
      			new_password:'',
      			verify_new_password:''
    		})
    	})
    	.catch(err =>{
    		console.log(err.message)
    	})
    	
    }

    handleSubmitInfo(event){
    	event.preventDefault();
    	console.log(this.state)
    	console.log('hello')
    	this.props.Auth.updateUser(this.state.id, this.state.first_name, this.state.last_name, this.state.email, null, null, this.state.school)
    	.then(res =>{
    		alert(res.message)
    		this.setState({
    			
    			first_name: res.data.first_name,
    			last_name: res.data.last_name,
    			email: res.data.email,
    			school: res.data.school,
    			role: res.data.role,
    			id: res.data._id,
    			old_password:'',
      			new_password:'',
      			verify_new_password:''
    			
    		})
    	})
    	.catch(err =>{
    		console.log(err)
    		this.setState({
    			old_password:'',
      			new_password:'',
      			verify_new_password:''
    		})
    	})
    }

    handleSubmitPassword(event){
    	event.preventDefault();
    	console.log(this.state);
    	
    	if (this.state.new_password != this.state.verify_new_password){
    		alert('Password anda berbeda. Ulangi')
    	}
    	else{
    		this.props.Auth.updateUser(this.state.id, this.state.first_name, this.state.last_name, this.state.email, this.state.old_password, this.state.new_password, this.state.school)
    		.then(res =>{
    			alert(res.message)
    			this.setState({
    				
    				first_name: res.data.first_name,
    				last_name: res.data.last_name,
    				email: res.data.email,
    				school: res.data.school,
    				role: res.data.role,
    				id: res.data._id,
    				old_password:'',
      				new_password:'',
      				verify_new_password:''
    			})
    		})
    		.catch(err =>{
    			console.log(err)
    			this.setState({
    				old_password:'',
      				new_password:'',
      				verify_new_password:''
    			})
    		})
    	}
    	
    }

    handleChange(event){
	    this.setState({
	    	[event.target.id]: event.target.value
	    });
  	}
	render(){
		if (!this.state.isLoading){
			var profile = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
    			school: this.state.school,
    			role: this.state.role,
    			id: this.state.id,
			}
			return(
				<div className='Dashboard'> 
					<DashboardNavigation course_option={false} profile={profile} Auth={this.props.Auth} userHasAuthenticated={this.props.userHasAuthenticated} history={this.props.history}/>
			    	<div className='ProfileSetting'>
			    		<h1> Pengaturan Akun </h1>
			    		<div className='content'>
			    			<div className='content-left'>
			    				<div className='avatar'>
			    					<Logo color='black' size='logo' background='trans' padding={false} style={{width:'6rem', margin:'auto'}}/>
			    				</div>
			    			</div>


			    			<div className='content-right'>
			    				<label>Informasi Anda</label>
			    				<form onSubmit={this.handleSubmitInfo}>
									<FormGroup controlId='first_name' className='form-group'>
										<ControlLabel className='form-group-label'>Nama Depan</ControlLabel>
								            <FormControl
								              type="text"
								              value={this.state.first_name}
								              onChange={this.handleChange}
								              className='form-group-entry'
								            />
								    </FormGroup>

								    <FormGroup controlId='last_name' className='form-group'>
								    	<ControlLabel className='form-group-label'>Nama Belakang</ControlLabel>
								    	<FormControl
								    		type='text'
								    		value={this.state.last_name}
								    		onChange={this.handleChange}
								    		className='form-group-entry'
								    	/>
								    </FormGroup>

								    <FormGroup controlId='school' className='form-group'>
								    	<ControlLabel className='form-group-label'>Universitas</ControlLabel>
								    	<FormControl
								    		type='text'
								    		value={this.state.school}
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

						       	<label>Ubah Password</label>
						       	<form onSubmit={this.handleSubmitPassword}>
						       		<FormGroup controlId='old_password' className='form-group'>
										<ControlLabel className='form-group-label'>Password Lama</ControlLabel>
								            <FormControl
								              type="password"
								              value={this.state.old_password}
								              onChange={this.handleChange}
								              className='form-group-entry'
								            />
								    </FormGroup>
								    <FormGroup controlId='new_password' className='form-group'>
										<ControlLabel className='form-group-label'>Password Baru</ControlLabel>
								            <FormControl
								              type="password"
								              value={this.state.new_password}
								              onChange={this.handleChange}
								              className='form-group-entry'
								            />
								    </FormGroup>
								    <FormGroup controlId='verify_new_password' className='form-group'>
										<ControlLabel className='form-group-label'>Ulangi Password Baru</ControlLabel>
								            <FormControl
								              type="password"
								              value={this.state.verify_new_password}
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