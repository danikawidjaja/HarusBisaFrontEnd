import React, { Component } from "react";
import "./ForgetPassword.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

export default class ForgetPassword extends Component {
  async componentWillMount(){
    window.scrollTo(0, 0);
    this.props.isNavVisible(true);
  }
  render() {
    return (
      <div className='forgetpassword'>
        <div className='text'> 
          <h1> Lupa password anda? </h1>
          <p style={{fontWeight: '300'}}> Jangan takut. Kami akan mengirimi Anda email instruksi untuk mereset password Anda. </p>
          <br/>
          <ForgetPasswordForm />
        </div>
        <Footer/>
      </div>     
    );
  }
}

class ForgetPasswordForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      email: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit= async event =>{
    event.preventDefault();

    alert(this.state.email);
  }

  validateForm(){
    return this.state.email.length > 0;
  }

  render(){
    return(
      <div className='form'>
      <form onSubmit={this.handleSubmit}>

        <FormGroup className="form-element" controlId="email" bsSize="small">
          <ControlLabel className='form-control-label' style={{marginBottom: '0.3vw'}}>Email</ControlLabel>
          <FormControl
            className='form-control'
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            style={{border:'1px black solid'}}
          />
        </FormGroup>
        <div style={{display:'flex', flexDirection:'row'}}>
        <Button
            bsSize="medium"
            type="submit"
            className="button"
            disabled={!this.validateForm()}
            style={{backgroundColor: '#ffe01c', color:'black', width:'30%'}}
          >
            Masuk
          </Button>
        <Link to='/login'> Kembali ke login </Link>
        </div>
      </form>
      </div>
    )
  }
}