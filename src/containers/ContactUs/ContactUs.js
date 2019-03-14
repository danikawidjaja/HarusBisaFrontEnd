import React, { Component } from "react";
import "./ContactUs.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from '../Footer';
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
        <div className='text'> 
          <h1> Hubungi Kami </h1>
          <p> Apabila terdapat pertanyaan seputar HarusBisa atau kerjasama dan hal lainnya, hubungi kami di +62 00 000 43000 atau isi formulir dibawah ini. Anda juga dapat melihat daftar pertanyaan yang sering ditanyakan di halaman Bantuan. </p>
          <br/>
          <ContactUsForm />
          
          <div style={{marginTop: '7vw'}}>
            <p> Email support request to: <br/> admin@harusbisa.com </p>
            <br/>
            <p> PT. HARUS BISA INDONESIA </p>
            <br/>
            <p> Jl. Tebet Barat Dalam Raya No. 22 RT. 11/Rw.3. Kec. Tebet. Kota Jakarta Selatan. Daerah Khusus Ibukota Jakarta 12810. Indonesia </p>
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