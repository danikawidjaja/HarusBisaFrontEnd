import React, { Component } from "react";
import "./ContactUs.css";
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

export default class ContactUs extends Component {
  async componentWillMount(){
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div className='contactus'>
        <div className='text container'> 
          <h1>Hubungi Kami</h1>
          <p>Kami di sini untuk membantu. Email kami melalui formulir di bawah ini. Saat mengirim pesan kepada kami, silakan cantumkan alamat email yang Anda gunakan saat mendaftar dengan HarusBisa.</p>
          <br/>
          <ContactUsForm />
          
          <div style={{marginTop: '7vw'}}>
            <p>PT Harus Bisa Indonesia</p>
            <p>Email: harusbisagroup@gmail.com</p>
            <p>Jam: 9:00 - 17:00 WIB, Senin-Jumat</p>
          </div>
        </div>
        <Footer/>
      </div>     
    );
  }
}

class ContactUsForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      message: ''
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

    alert(this.state.message);
  }

  validateForm(){
    return this.state.email.length > 0 && this.state.name.length > 0 && this.state.message.length >0;
  }

  render(){
    return(
      <div className='form'>
      <form onSubmit={this.handleSubmit}>
        <FormGroup className="form-element" controlId="name" bsSize="small">
          <ControlLabel className='form-control-label'>Nama</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup className="form-element" controlId="email" bsSize="small">
          <ControlLabel className='form-control-label'>Email</ControlLabel>
          <FormControl
            className='form-control'
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup className="form-element" controlId="message" bsSize="small">
          <ControlLabel className='form-control-label'>Pesan</ControlLabel>
          <FormControl
            type="textarea"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </FormGroup>

        <Button
            block
            bsSize="medium"
            type="submit"
            className="button"
            disabled={!this.validateForm()}
          >
            Submit
          </Button>
      </form>
      </div>
    )
  }
}