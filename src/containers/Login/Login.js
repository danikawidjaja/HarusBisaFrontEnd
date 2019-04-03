import React, { Component } from 'react';
import './Login.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect, withRouter} from "react-router-dom";
import login1 from './login1.png';
import login2 from './login2.png';
import login from './login.png';
import errormessage_icon from './errormessage_icon.png';
import Logo from '../Logo/Logo';

class Login extends Component {
  async componentDidMount(){
      this.props.isNavVisible(false);
      window.scrollTo(0, 0);
    }
  render() {
    return (
      <div className='login'>
        <div className='left'>
          <div style={{width:'50%', textAlign:'center'}}>
            <Logo size='logo' color='black' background='trans' padding={false} style={{width:'6rem'}}/>
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
            <p> Karena kita adalah sesuatu yang harus terjadi sehingga jadikan sesuatu berarti dalam </p>
            <h2> Sri Mulyani </h2>
          </div>
          <img src={login} style={{width:'100%', height:'25vw'}}/>
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
      error: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.Auth = new AuthService();
    this.Auth = this.props.Auth
  }

  //Auth = this.props.Auth

  displayErrorMessage(error){
    console.log('hi im here')
    if (!error){
      
      return(<ErrorMessage />)
    }
  }
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
          this.setState({error: false});
          this.props.userHasAuthenticated(true);
          this.props.history.push('/courses');
        }
      })
      .catch(err =>{
        alert(err.message); 
        this.setState({ error: true});
        this.displayErrorMessage(true)
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
        {this.displayErrorMessage}
        <form className='login-form' onSubmit={this.handleSubmit}>
          <FormGroup className="form-element" controlId="email" bsSize="small" style={{marginBottom:'1vw'}}>
            <ControlLabel className='form-control-label' style={{fontSize:'1.5vw'}}> Email </ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              /*style={{height:'3vw', borderRadius:'0px'}}*/
            />
          </FormGroup>

          <FormGroup className="form-element" controlId="password" bsSize="small">
            <ControlLabel className='form-control-label' style={{fontSize:'1.5vw'}}> Password </ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              /*style={{height:'3vw', borderRadius:'0px'}}*/
            />
          </FormGroup>

          <Button
            block
            bsSize="medium"
            disabled={!this.validateForm()}
            type="submit"
            style={{backgroundColor: '#ffe01c', fontWeight: '300', borderRadius:'0px', border:'0px', fontSize:'1.5vw'}}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

class ErrorMessage extends Component{
  constructor(props){
    super(props);
    this.state ={
      error: 'Alamat email atau password tidak ditemukan' //this.props.message
    }
  }
  render(){
    return(
      <div className='errormessage'>
        <img src={errormessage_icon} style={{maxWidth:'100%', marginRight:'1vw'}}/>
        <p> {this.state.error} </p>
      </div>
    )
  }
}
export default Login;