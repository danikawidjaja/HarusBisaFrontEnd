import React, { Component } from 'react';
import './Page.css';
import Select from 'react-select';
import { options } from './UniversityList';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";

class SignUp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-header-text">
            Sign Up
          </p>
          <p className="App-caption-text">
            Create your account below:
          </p>
          <SignUpForm/>
        </header>
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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length >0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeSchool = (school) => {
    this.setState({ school });
  }


  handleSubmit(event){
    alert('Welcome ' + this.state.firstname)
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="firstname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="lastname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>      

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup> 

        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
          
        <FormGroup controlId="school" bsSize="large">
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
        >
          Sign Up
        </Button> 
      </form>


    );
  }
}

export default SignUp;
