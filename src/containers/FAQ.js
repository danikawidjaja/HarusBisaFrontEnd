import React, { Component } from "react";
import "./FAQ.css";
import { Button, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default class FAQ extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      role:'faculty'
    }

    this.handleChangeRole = this.handleChangeRole.bind(this);
  }

  async componentWillMount(){
    window.scrollTo(0, 0);
  }

  handleChangeRole(value, event) {
    this.setState({
      role: value
    });
  }

  informationDisplay(){
    if (this.state.role === 'faculty'){
      return(<Faculty/>)
    }
    else if (this.state.role === 'student'){
      return (<Student/>)
    }
  }
  render() {
    return (
      <div className='faq'>
        <div className='text'> 
          <h1> F.A.Q </h1>
          <p> Informasi mengenai HarusBisa dan beberapa hal pertanyaan yang sering diajukan oleh pengguna </p>
          <ToggleButtonGroup className='buttons' name='role'type='radio' defaultValue={'faculty'} onChange={this.handleChangeRole}>
            <ToggleButton className='button' value='faculty' defaultChecked> Dosen </ToggleButton>
            <ToggleButton className='button' value='student'> Mahasiswa </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {this.informationDisplay()}

        <Footer/>
      </div>     
    );
  }
}

class Faculty extends Component{
  constructor(props){
    super(props);
    this.state={
      value:1
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, event) {
    this.setState({
      value
    });
  }

  information(){
    if (this.state.value === 1){
      return(<p> This is how you change course setting </p>)
    }
    else if (this.state.value === 2){
      return (<p> This is how you create a new course </p>)
    }
    else if (this.state.value === 3){
      return(<p> This is how you create a new course in HarusBisa </p>)
    }
  }

  render(){
    return(
      <div className='info'>
          <ToggleButtonGroup className='left' name='information' type='radio' defaultValue={1} onChange={this.handleChange}>
            <ToggleButton className='button' value={1} defaultChecked> Change Course Setting </ToggleButton>
            <ToggleButton className='button' value={2}> Create a New Course </ToggleButton>
            <ToggleButton className='button' value={3}> Creating a course in HarusBisa </ToggleButton>
          </ToggleButtonGroup>
        
        <div className='right'>
          <h2> Faculty </h2>
          {this.information()}
        </div>

      </div>
    )
  }
}

class Student extends Component{

  constructor(props){
    super(props);
    this.state={
      value:1
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, event) {
    this.setState({
      value
    });
  }

  information(){
    if (this.state.value === 1){
      return(<p> This is how you change course setting </p>)
    }
    else if (this.state.value === 2){
      return (<p> This is how you create a new course </p>)
    }
    else if (this.state.value === 3){
      return(<p> This is how you create a new course in HarusBisa </p>)
    }
  }

  render(){
    return(
      <div className='info'>
          <ToggleButtonGroup className='left' name='information' type='radio' defaultValue={1} onChange={this.handleChange}>
            <ToggleButton className='button' value={1} defaultChecked> Change Course Setting </ToggleButton>
            <ToggleButton className='button' value={2}> Create a New Course </ToggleButton>
            <ToggleButton className='button' value={3}> Creating a course in HarusBisa </ToggleButton>
          </ToggleButtonGroup>
        
        <div className='right'>
          <h2> Student </h2>
          {this.information()}
        </div>

      </div>
    )
  }
}