import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import { options } from './UniversityList';



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
      password: null,
      email: null,
      firstname: null,
      lastname: null,
      school: null,
    };
    this.handleInputChangePassword = this.handleInputChangePassword.bind(this);
    this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this);
    this.handleInputChangeFirstname = this.handleInputChangeFirstname.bind(this);
    this.handleInputChangeLastname = this.handleInputChangeLastname.bind(this);
    this.handleInputChangeSchool = this.handleInputChangeSchool.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChangeFirstname(event){
    const target = event.target;
    const email = target.email;
    this.setState({
      [email]: target.value
    });
  }

  handleInputChangeLastname(event){
    const target = event.target;
    const email = target.email;
    this.setState({
      [email]: target.value
    });
  }

  handleInputChangeEmail(event){
    const target = event.target;
    const email = target.email;
    this.setState({
      [email]: target.value
    });
  }

  handleInputChangePassword(event){
    const target = event.target;
    const password = target.password;
    this.setState({
      [password]: target.value
    });
  }



  handleInputChangeSchool = (school) => {
    this.setState({ school });
    console.log(`Option selected:`, school);
  }


  handleSubmit(event){
    alert("Welcome " + this.state.firstname)
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <p className="App-caption-text">
            School: &nbsp;
             <Select
                value={this.state.school}
                onChange={this.handleInputChangeSchool}
                options={options}
              />
      </p>
      <p className="App-caption-text">
            First Name: &nbsp; 
            <input
              name= "firstname"
              type= "textarea"
              value = {this.state.firstname}
              onChange = {this.handleInputChangeFirstname} />
      </p>
      <p className="App-caption-text">
            Last Name: &nbsp; 
            <input
              name= "email"
              type= "textarea"
              value = {this.state.lastname}
              onChange = {this.handleInputChangeEmail} />
      </p>
      <p className="App-caption-text">
            Email Address: &nbsp; 
            <input
              name= "email"
              type= "textarea"
              value = {this.state.email}
              onChange = {this.handleInputChangeEmail} />
      </p>
      <p className="App-caption-text">
            Password: &nbsp;
            <input
              name= "password"
              type= "password"
              value= {this.state.password}
              onChange = {this.handleInputChangePassword} />
      </p>


      <br/>

      <input type="submit" value ="Submit"/>
      </form>


    );
  }
}

export default App;
