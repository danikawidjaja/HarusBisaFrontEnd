import React, { Component } from 'react';
import './Page.css';
import Select from 'react-select';
import { options } from './UniversityList';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

import AuthService from './AuthService';

class SignUp extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-header-text">
            Sign Up
          </h2>
        </div>

        <div className='App-content'>
          <p className="App-caption-text">
            Create your account below:
          </p>
          <SignUpForm history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} Auth={this.props.Auth}/>
        </div>
      </div>
    );
  }
}

class SignUpForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      password: '',
      confirmPassword:'',
      email: '',
      firstname: '',
      lastname: '',
      school: '',
      role:'',
      schoolSelected: false,
      roleSelected: false
    };
    //this.Auth = new AuthService();
    this.Auth = this.props.Auth
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //Auth = this.props.Auth
  async componentWillMount(){
    if(this.Auth.loggedIn()){
      this.props.history.push('/courses');
    }
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length >0 &&
      this.state.schoolSelected && this.state.roleSelected
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeSchool = (school) => {
    this.setState({ school, schoolSelected:true });
  }

  handleChangeRole = (role) =>{
    this.setState({role, roleSelected:true});
  }

  handleSubmit= async event =>{
    event.preventDefault();
    this.Auth.signup(this.state.password, this.state.email, this.state.firstname, this.state.lastname, this.state.school.value, this.state.role)
      .then(res =>{
        this.Auth.login(this.state.email, this.state.password)
          .then(res=>{
            if (this.Auth.loggedIn()){
              this.props.userHasAuthenticated(true);
              this.props.history.push('/courses');
            }
          })
          .catch(err =>{
            alert(err.message);
          })
      })
      .catch(err =>{
        alert(err.message);
      })
  }

  async componentWillMount(){
    if(this.Auth.loggedIn()){
      this.props.userHasAuthenticated(true);
      this.props.history.push('/courses');
    }
  }
  
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
        <FormGroup className="form-element" controlId="role" bsSize='large'>
          <ControlLabel> I am a: </ControlLabel>
          <ToggleButtonGroup 
            className="form-element"
            bsSize='large'
            type='radio'
            name='options'
            value={this.state.role}
            onChange={this.handleChangeRole}>
            <ToggleButton value={'faculty'}> Faculty </ToggleButton>
            <ToggleButton value={'student'}> Student </ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        </div>

        <div className="form-row">
        <FormGroup className="form-element" controlId="firstname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup className="form-element" controlId="lastname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </FormGroup>
        </div>

        <FormGroup className="form-element" controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>

        <div className="form-row">      
        <FormGroup className="form-element" controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup> 

        <FormGroup className="form-element" controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        </div>
          
        <FormGroup className="form-element" controlId="school" bsSize="large">
          <ControlLabel> School </ControlLabel>
          <Select
            isClearable
            value={this.state.school}
            onChange={this.handleChangeSchool}
            options={options}
           />
        </FormGroup>  
        
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          className="button"
        >
          Sign Up
        </Button> 
      </form>


    );
  }
}

export default SignUp;
