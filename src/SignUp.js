import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { options } from './UniversityList';

type School = {
  options: [{ [string]: string}],
  value: string | void,
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo"/>
          <p className="App-header-text">
            Sign Up
          </p>
          <p className="App-caption-text">
            Create your account below:
          </p>
          <SignUp/>
        </header>
      </div>
    );
  }
}

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      school: '',
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeSchool = this.handleChangeSchool.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChangeFirstname(event){
    this.setState({
      firstname: event.target.value
    });
  }

 handleChangeLastname(event){
    this.setState({
      lastname: event.target.value
    });
  }
  handleChangePassword(event){
    this.setState({
      password: event.target.value
    });
  }
  handleChangeEmail(event){
    this.setState({
      email: event.target.value
    });
  }

  handleChangeSchool = (school) => {
    this.setState({ school });
  }

  handleCreateSchool = (inputValue: any) => {
    const newOption = createOption(inputValue);
    this.setState({school: newOption});
  }


  handleSubmit(event){
    alert('Welcome ' + this.state.firstname)
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <p className="App-caption-text">
            School: &nbsp;
             <CreatableSelect
                isClearable
                value={this.state.school}
                onChange={this.handleChangeSchool}
                onCreateOption ={this.handleCreateSchool}
                options={options}
              />
              
      </p>
      <p className="App-caption-text">
            First Name: &nbsp; 
            <input
              name= "firstname"
              type= "text"
              value = {this.state.firstname}
              onChange = {this.handleChangeFirstname} />
      </p>
      <p className="App-caption-text">
            Last Name: &nbsp; 
            <input
              name= "lastname"
              type= "text"
              value = {this.state.lastname}
              onChange = {this.handleChangeLastname} />
      </p>
      <p className="App-caption-text">
            Email Address: &nbsp; 
            <input
              name= "email"
              type= "text"
              value = {this.state.email}
              onChange = {this.handleChangeEmail} />
      </p>
      <p className="App-caption-text">
            Password: &nbsp;
            <input
              name= "password"
              type= "password"
              value= {this.state.password}
              onChange = {this.handleChangePassword} />
      </p>


      <br/>

      <input type="submit" value ="Submit"/>
      </form>


    );
  }
}
