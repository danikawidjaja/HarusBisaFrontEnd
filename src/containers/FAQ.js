import React, { Component } from "react";
import "./FAQ.css";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default class FAQ extends Component {
  constructor(props){
    super(props);
    this.state ={
      role:'faculty'
    }
  }

  handleChangeRole = changeEvent => {
    console.log(changeEvent.target.value)
    this.setState({
      role: changeEvent.target.value,
    });
  }
  render() { 
    return (
      <div className='faq'>
        <div className='text'> 
          <h1> F.A.Q </h1>
          <p> Informasi mengenai HarusBisa dan beberapa hal pertanyaan yang sering diajukan oleh pengguna </p>
          <div className='buttons'>
            <Button className='button' onClick={this.handleChangeRole} value='faculty' (pre-checked)> Dosen </Button>
            <Button className='button' onClick={this.handleChangeRole} value='student'> Mahasiswa </Button>
          </div>
        </div>

        <Faculty/>

        <Footer/>
      </div>     
    );
  }
}

class Faculty extends Component{

  render(){
    return(
      <div className='info'>
        <div className='left'>
          <Button> Change Course Settings </Button>
          <Button> Create a New Course </Button>
          <Button> Creating a course in HarusBisa  </Button>
        </div>
        
        <div className='right'>
          <h3> Change Course Settings </h3>
          <p> lorem ipsum </p>
        </div>

      </div>
    )
  }
}

class Student extends Component{

  render(){
    return(
      <div className='info'>
        <div className='left'>
          <Button> Change Course Settings </Button>
          <Button> Create a New Course </Button>
          <Button> Creating a course in HarusBisa  </Button>
        </div>
        
        <div className='right'>
          <h3> Change Course Settings </h3>
          <p> lorem ipsum </p>
        </div>

      </div>
    )
  }
}