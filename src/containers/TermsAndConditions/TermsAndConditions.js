import React, { Component } from "react";
import "./TermsAndConditions.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';

export default class TermsAndConditions extends Component {
  async componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className='termsandconditions'>
        <div className='text container'> 
          <h1>Syarat dan Ketentuan</h1>
          <p>Terima kasih telah meluangkan waktu untuk membuka tentang syarat dan ketentuan dari HarusBisa. Di sinilah Anda akan menemukan informasi tentang bagaimana kami melindungi privasi Anda, apa yang Anda bisa dan tidak bisa lakukan dengan HarusBisa, dan bagaimana kami menangani akun pengguna.</p>
        </div>
        <Footer/>
      </div>     
    );
  }
}