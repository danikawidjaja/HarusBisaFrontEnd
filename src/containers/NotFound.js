import React from "react";
import "./NotFound.css";
import {Link} from "react-router-dom";
import pic from './hminianeh.png';
import { Button} from "react-bootstrap";

export default () =>
  <div className="NotFound">
  	<div className='image'>
  		<img src ={pic} />
  	</div>
  	<div className ='text'>
  		<h1> hmm.. ini aneh </h1>
  		<p> Terjadi kesalahan halaman yang anda minta </p>
  		<br/>
  		<Button className='n-button'> Kembali ke Home </Button>
  	</div>
  </div>;