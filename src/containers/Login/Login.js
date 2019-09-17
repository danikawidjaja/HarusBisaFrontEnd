import React, { Component } from 'react';
import './Login.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, Redirect, withRouter} from "react-router-dom";
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Logo from '../Logo/Logo';

class Login extends Component {
  async componentDidMount(){
      this.props.isNavVisible(false);
      window.scrollTo(0, 0);
    }
  render() {
    return (
      <div className='login container'>
          <div class='content'>
            <Logo size='logo' color='black' background='trans' padding={false} style={{width:'10vh', height:"12vh"}}/>
            <h1> Log In </h1>
            <div style={{alignItems: 'flex-start', display: 'flex', flexDirection: 'column'}}>
              <p> Tidak punya akun? </p>
              <Link to='/signup'> Daftar sekarang </Link>
            </div>
            <LoginForm history={this.props.history} userHasAuthenticated={this.props.userHasAuthenticated} Auth={this.props.Auth}/>
            <Link to='/forgetpassword'> Lupa Password anda? </Link>
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
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Auth = this.props.Auth
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
        this.setState({ error: err});
        console.log(err)
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
        {this.state.error && <ErrorMessage msg={this.state.error.message}/>}
        <form className='login-form' onSubmit={this.handleSubmit}>
          <FormGroup className="form-element" controlId="email" bsSize="small" style={{marginBottom:'1vw'}}>
            <ControlLabel className='form-control-label'> Email* </ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup className="form-element" controlId="password" bsSize="small">
            <ControlLabel className='form-control-label'> Password* </ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button
            block
            bsSize="medium"
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
  render(){
    return(
      <div className='errormessage'>
        <ErrorOutline className='icon'/>
        <p> {this.props.msg} </p>
      </div>
    )
  }
}
export default Login;
export {ErrorMessage};