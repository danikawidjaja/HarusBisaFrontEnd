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
            Login to Harus Bisa!
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
      school: null,
      username: null,
      password: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }
 

  handleSubmit(event){
    if (this.state.school === null || this.state.school === " " || this.state.username === null || this.state.username === " " || this.state.password === null || this.state.password === " "  ){
      alert('Missing information!');
    }
    else{
      alert("Welcome " + this.state.username)
    }
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <p className="App-caption-text">
            School: 
            <input
              name= "school"
              type= "textarea"
              value= {this.state.school}
              onChange = {this.handleInputChange} />
      </p>
      <p className="App-caption-text">
            Username: 
            <input
              name= "username"
              type= "textarea"
              value = {this.state.username}
              onChange = {this.handleInputChange} />
      </p>
      <p className="App-caption-text">
            Password: 
            <input
              name= "password"
              type= "password"
              value= {this.state.password}
              onChange = {this.handleInputChange} />
      </p>
      <br/>
      <input type="submit" value ="Submit"/>
      </form>
    );
  }
}

export default App;
