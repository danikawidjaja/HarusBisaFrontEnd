import React, { Component } from "react";
import "./Footer.css";
import facebook from './facebook.png';
import linkedin from './linkedin.png';
import twitter from './twitter.png';
import instagram from './instagram.png';
import { Link } from "react-router-dom";

export default class Footer extends Component {

  render() {
    return (
        <div className='footer'>
          <div style={{border:'1px solid white', borderRadius:'15px', width:'10%', height:'100px', marginTop:'5vw'}} />
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
            <Link to='/' className='f-link'> FAQ </Link>
            <Link to='/' className='f-link'> Syarat dan <br/> Ketentuan </Link>
            <Link to='/' className='f-link'> Hubungi Kami </Link>
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