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
          <h1> F.A.Q </h1>
          <p> Informasi mengenai HarusBisa dan beberapa hal pertanyaan yang sering diajukan oleh pengguna </p>
          <div className='buttons'>
            <Button className='button'> Dosen </Button>
            <Button className='button'> Mahasiswa </Button>
          </div>
        </div>

        <div className='info'>
          <div className='left'>
          </div>
          <div className='right'>
          </div>
        </div>

        <Footer/>
      </div>     
    );
  }
}