import React, { Component } from 'react';
import './SignUp.css';
import Select from 'react-select';
import login2 from './login2.png';
import { Link, Redirect, withRouter} from "react-router-dom";
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
import Logo from '../Logo/Logo';



class SignUp extends Component {
  async componentDidMount(){
      this.props.isNavVisible(false);
      window.scrollTo(0, 0);
    }
  render() {
    return (
      <div className='signup'>
        <div className='row justify-content-center'>
          <div className="col-md-3">
            <Logo size='logo' color='black' background='trans' padding={false} className="logo"/>
          </div>
          
          <div className='col-md-9'>
            <div style={{justifyContent:'flex-start'}}>
              <h1> Daftar </h1>
            </div>
            <SignUpForm history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} Auth={this.props.Auth}/>
          </div>
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
    this.Auth = this.props.Auth
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
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

  handleChangeRole = changeEvent => {
    this.setState({
      role: changeEvent.target.value,
      roleSelected: true
    });
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
      <div className='signup-form'>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className="col-6" style={{display:'flex', justifyContent:'space-evenly'}}>
              <input
                type='radio'
                value='student'
                checked={this.state.role === "student"}
                onChange={this.handleChangeRole}
              />
              <label>Mahasiswa</label>
            </div>

            <div className='col-6' style={{display:'flex', justifyContent:'space-evenly'}}>
              <input
                type='radio'
                value='faculty'
                checked={this.state.role === "faculty"}
                onChange={this.handleChangeRole}
              />
              <label>Dosen</label>
            </div>
          </div>

          <div className="row">
            <FormGroup className="col-lg-6" controlId="firstname" bsSize="medium">
              <ControlLabel>Nama Depan</ControlLabel>
              <FormControl
                type="text"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup className="col-lg-6" controlId="lastname" bsSize="medium">
              <ControlLabel>Nama Belakang</ControlLabel>
              <FormControl
                type="text"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>

          <div className='row'>
          <FormGroup className="col" controlId="school" bsSize="medium">
            <ControlLabel> Nama Perguruan Tinggi </ControlLabel>
            <Select
              isClearable
              value={this.state.school}
              onChange={this.handleChangeSchool}
              options={options}
            />
          </FormGroup> 
          </div>

          <div className='row'>
          <FormGroup className="col" controlId="email" bsSize="medium">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          </div>

          <div className="row">      
            <FormGroup className="col-lg-6" controlId="password" bsSize="medium">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup> 

            <FormGroup className="col-lg-6" controlId="confirmPassword" bsSize="medium">
              <ControlLabel>Ulangi Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className='row'>
            <div className='col'>
              <p>Password anda {this.state.password !== this.state.confirmPassword ? "tidak" : ""} sama</p>
            </div>
          </div>
          <div className="row">
            <div className='col-12'>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                className="button"
              >
                Daftar
              </Button> 
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
