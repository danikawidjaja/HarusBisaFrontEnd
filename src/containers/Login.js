import React, { Component } from 'react';
import './Login.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect, withRouter} from "react-router-dom";
import AuthService from './AuthService';
import login1 from './login1.png';
import login2 from './login2.png';

class Login extends Component {
  render() {
    return (
      <div className='login'>
        <div className='left'>
          <div style={{width:'50%', textAlign:'center'}}>
            <img src={login2} style={{width:'5vw'}}/>
            <h1> Log In </h1>
            <div style={{alignItems: 'flex-start', display: 'flex', flexDirection: 'column'}}>
              <p> Tidak punya akun? </p>
              <Link to='/signup'> Daftar sekarang </Link>
            </div>
            <LoginForm history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} Auth={this.props.Auth}/>
            <Link to='/forgetpassword'> Lupa Password anda? </Link>
          </div>
        </div>

        <div className='right'>
          <div className='text'>
            <p> Karena kita adalah sesuatu yang harus terjadi <br/> sehingga jadikan sesuatu berarti dalam </p>
            <h2> Sri Mulyani </h2>
          </div>
          <div className='decoration'>
            <img src={login2} style={{height: '100%', marginTop:'230px'}}/>
            <img src={login1}/>
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
      <div >
        <form className='login-form' onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="medium">
            <ControlLabel> Email </ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="medium">
            <ControlLabel> Password </ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button
            block
            bsSize="medium"
            disabled={!this.validateForm()}
            type="submit"
            style={{backgroundColor: '#ffe01c', fontWeight: '300', borderRadius:'0px', border:'0px'}}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;