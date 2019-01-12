import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo"/>
          <p className="App-header-text">
            Login
          </p>
          <p className="App-caption-text">
            Welcome back! Please log in below
          </p>
          <Login/>
        </header>
      </div>
    );
  }
}

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
  {/* Must check if correct or not before proceeding to next page*/}
    alert("Welcome " + this.state.email)
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
     
      <p className="App-caption-text">
            Email: &nbsp; 
            <input
              name= "email"
              type= "textarea"
              value = {this.state.email}
              onChange = {this.handleChangeEmail} />
      </p>
      <br/>
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

      <p className="App-caption-text" style={{fontSize: 15}}>
        Don't have an account yet? Sign up
      </p>
      </form>
    );
  }
}