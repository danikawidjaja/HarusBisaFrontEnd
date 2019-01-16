import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from './AuthService';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header-text">
            Login
          </h1>
          <label className="App-caption-text">
            Welcome back! Please log in below
          </label>
          <LoginForm/>
          <h5 className="App-caption-text">
            Don't have an account?
          </h5>
          <Link to="/signup" className="App-link"> Sign up here </Link>
        </header>
      </div>

    );
  }
}

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Auth = new AuthService();
  }

  validateForm(){
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    alert("Welcome " + this.state.username);
    this.Auth.login(this.state.username, this.state.password)
      .then(res =>{
        this.props.history.replace('/courses');
      })
      .catch(err =>{
        alert(err);
      })
  }

  componentWillMount(){
    if(this.Auth.loggedIn()){
      this.props.history.replace('/courses');
    }
  }

  render(){
    return(
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autofocus
              type="text"
              value={this.state.username}
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

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            className="button"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;