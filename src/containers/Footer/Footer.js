import React, { Component } from "react";
import "./Footer.css";
import facebook from './facebook.png';
import linkedin from './linkedin.png';
import twitter from './twitter.png';
import instagram from './instagram.png';
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

export default class Footer extends Component {

  render() {
    return (
        <div className='footer'>
          <Logo size='logo' color='white' background='trans' padding='false' style={{width:'10vw',height:'25vh', marginTop:'auto', marginBottom:'auto'}}/>
          <div className='f-about'>
            <p> HarusBisa menyediakan alat untuk para insturktur memberikan lecture yang berkualitas. menggunakan alat yang canggih dan dapat bisa memudahkan secara GRATIS sampai ke seluruh pelosok Indonesia. </p>
            <br/> <br/>
            <p> Copyright PT. HarusBisa Indonesia | HarusBisa 2018 </p>
          </div>

          <div className='links'>
            <Link to='/' className='f-link'> Home </Link>
            <Link to='/' className='f-link'> Kenapa <br/> HarusBisa? </Link>
            <Link to='/' className='f-link'> Pricing </Link>
          </div>

          <div className='links'>
            <Link to='/faq' className='f-link'> FAQ </Link>
            <Link to='/termsandconditions' className='f-link'> Syarat dan <br/> Ketentuan </Link>
            <Link to='/contactus' className='f-link'> Hubungi Kami </Link>
          </div>

          <div className='socialmedia'>
            <Link to="/"><img class="socmed-i" src={facebook}/></Link>
            <Link to="/"><img class="socmed-i" src={twitter}/></Link>
            <Link to="/"><img class="socmed-i" src={instagram}/></Link>
            <Link to="/"><img class="socmed-i" src={linkedin}/></Link>
          </div>
        </div>
    );
  }
}