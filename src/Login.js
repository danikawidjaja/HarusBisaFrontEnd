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
      username: null,
      password: null,
    };
    this.handleInputChangeName = this.handleInputChangeName.bind(this);
    this.handleInputChangePassword = this.handleInputChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChangeName(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleInputChangePassword(event){
    const target = event.target;
    const password = target.password;
    this.setState({
      [password]: target.value
    });
  }


  handleSubmit(event){
    alert("Welcome " + this.state.username)
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
     
      <p className="App-caption-text">
            Username: &nbsp; 
            <input
              name= "username"
              type= "textarea"
              value = {this.state.username}
              onChange = {this.handleInputChangeName} />
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

      <p className="App-caption-text" style={{fontSize: 15}}>
        Don't have an account yet? Sign up
      </p>
      </form>


    );
  }
}