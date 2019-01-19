import React, { Component } from 'react';
import './Page.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect, withRouter} from "react-router-dom";
import AuthService from './AuthService';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <div className='App-page'>
          <div className='App-main'>
            <div className="App-header">
              <h2 className="App-header-text">
                Login
              </h2>
            </div>

            <div className="App-content">
              <h5> Need a new account? </h5>
              <Link to="/signup" className="App-link"> Sign up here </Link>
              <LoginForm history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} Auth={this.props.Auth}/>
              <Link to='/' className='App-link'> Forgot your password? </Link>
            </div>
          </div>

          <div className="App-side-content">
            <div >
              <p> Pembelajaran yang memberikan kesempatan kepada perserta didik untuk aktif membangun sendiri konsep dan magna </p>
              <h5> Sri Mulyani </h5>
            </div>
          </div>

        </div>
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
    //this.Auth = new AuthService();
    this.Auth = this.props.Auth
  }

  //Auth = this.props.Auth

  validateForm(){
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit= async event =>{
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res =>{
        if (this.Auth.loggedIn()){
          this.props.userHasAuthenticated(true);
          this.props.history.push('/courses');
        }
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
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder='Email'
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder='Password'
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