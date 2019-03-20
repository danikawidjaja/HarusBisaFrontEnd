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



class SignUp extends Component {
  async componentDidMount(){
      this.props.isNavVisible(false);
      window.scrollTo(0, 0);
    }
  render() {
    return (
      <div className='signup'>
        <div className='logo'>
          <Link to="/"><img src={login2} style={{width:'100%'}}/></Link>
        </div>
        <div className='content'>
          <div style={{justifyContent:'flex-start', width:'70%'}}>
            <h1> Daftar </h1>
          </div>
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
        <div className='form-row'>
            <label className='radio-btn'>
              <input
                type='radio'
                value='student'
                checked={this.state.role === "student"}
                onChange={this.handleChangeRole}
              />
              Mahasiswa
            </label>

            <label className='radio-btn'>
              <input
                type='radio'
                value='faculty'
                checked={this.state.role === "faculty"}
                onChange={this.handleChangeRole}
              />
              Dosen
            </label>
          
        </div>

        <div className="form-row">
          <FormGroup className="form-element-l" controlId="firstname" bsSize="medium">
            <ControlLabel>Nama Depan</ControlLabel>
            <FormControl
              type="text"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="form-element-r" controlId="lastname" bsSize="medium">
            <ControlLabel>Nama Belakang</ControlLabel>
            <FormControl
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </FormGroup>
        </div>

        <div className='form-row'>
        <FormGroup className="form-element" controlId="school" bsSize="medium">
          <ControlLabel> Nama Universitas </ControlLabel>
          <Select
            isClearable
            value={this.state.school}
            onChange={this.handleChangeSchool}
            options={options}
           />
        </FormGroup> 
        </div>

        <div className='form-row'>
        <FormGroup className="form-element" controlId="email" bsSize="medium">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        </div>

        <div className="form-row">      
        <FormGroup className="form-element-l" controlId="password" bsSize="medium">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup> 

        <FormGroup className="form-element-r" controlId="confirmPassword" bsSize="medium">
          <ControlLabel>Ulangi Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        </div>
          
         
        <div className="form-row">
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
      </form>
      </div>


    );
  }
}

export default SignUp;
