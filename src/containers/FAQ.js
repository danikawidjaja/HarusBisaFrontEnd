import React, { Component } from "react";
import "./FAQ.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default class FAQ extends Component {

  render() {
    return (
      <div className='faq'>
        <div className='text'> 
          <h1> Syarat dan Ketentuan </h1>
          <p> Terima kasih telah meluangkan waktu untuk mempelajari tentang kebijakan hukum HarusBisa. Ini hal penting. Di sinilah Anda akan menemukan informasi tentang bagaimana kami melindungi privasi Anda, apa yang bisa dan tidak bisa Anda lakukan dengan HarusBisa, dan bagaimana kami menangani akun pengguna. </p>
        </div>

        <Footer/>
      </div>     
    );
  }
}