import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class Login extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-header-text">
            Login
          </p>
          <label className="App-caption-text">
            Welcome back! Please log in below
          </label>
          <LoginForm/>
        </header>
      </div>
    );
  }
}

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm(){
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

 

  handleSubmit(event){
  {/* Must check if correct or not before proceeding to next page*/}
    alert("Welcome " + this.state.email)
    event.preventDefault();
  }

  render(){
    return(
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autofocus
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

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;