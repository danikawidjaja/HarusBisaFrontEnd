import React, { Component } from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
 
export default class Footer extends Component {

  render() {
    return (
        <div className='footer'>
          <div className='container'>
            <div class='content row'>
              <div class='col-6'>
                <p> HarusBisa menyediakan alat untuk para insturktur memberikan lecture yang berkualitas. menggunakan alat yang canggih dan dapat bisa memudahkan secara GRATIS sampai ke seluruh pelosok Indonesia. </p>
                <br/> <br/>
                <p> Copyright PT. HarusBisa Indonesia | HarusBisa 2018 </p>
              </div>
              <div class='col-6'>
                <div class='row justify-content-end'>
                  <div class='col-4 links'>
                    <a href='/#top' className='f-link'> Home </a>
                    <a href='/#about' className='f-link'> Kenapa <br/> HarusBisa? </a>
                    <a href='/#pricing' className='f-link'> Pricing </a>
                  </div>
                  <div class='col-4 links'>
                    <a href='/faq' className='f-link'> FAQ </a>
                    <a href='/termsandconditions' className='f-link'> Syarat dan <br/> Ketentuan </a>
                    <a href='/contactus' className='f-link'> Hubungi Kami </a>
                  </div>
                </div>
                <br/>
                <div class='row justify-content-end'>
                  <div class='col-1'><FaFacebookF class='icon'/></div>
                  <div class='col-1'><FaTwitter class='icon'/></div>
                  <div class='col-1'><FaInstagram class='icon'/></div>
                  <div class='col-1'><FaLinkedinIn class='icon'/></div>
                  
                </div>              
              </div>
            </div>
          </div>
        </div>
    );
  }
}