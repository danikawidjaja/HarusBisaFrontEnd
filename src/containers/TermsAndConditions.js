import React, { Component } from "react";
import "./TermsAndConditions.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default class TermsAndConditions extends Component {
  async componentWillMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className='termsandconditions'>
        <div className='text'> 
          <h1> Syarat dan Ketentuan </h1>
          <p> Terima kasih telah meluangkan waktu untuk mempelajari tentang kebijakan hukum HarusBisa. Ini hal penting. Di sinilah Anda akan menemukan informasi tentang bagaimana kami melindungi privasi Anda, apa yang bisa dan tidak bisa Anda lakukan dengan HarusBisa, dan bagaimana kami menangani akun pengguna. </p>
        </div>

        <Footer/>
      </div>     
    );
  }
}