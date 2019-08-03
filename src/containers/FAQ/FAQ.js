import React, { Component } from "react";
import "./FAQ.css";
import { ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import Footer from '../Footer/Footer';
import { Button } from "@material-ui/core";

const proffaqInfo = [
  {option:"General",
  qa:[
    {question: "Apa itu kelas?", answer: "Answer"},
    {question: "Apa itu kelas?", answer: "Answer"},
    {question: "Apa itu kelas?", answer: "Answer"},
    {question: "Apa itu kelas?", answer: "Answer"}
  ]
  }, 
  {option: "Semester Baru",
  qa:[
    {question: "Bagaimana membuat sesi?", answer: "Answer"},
    {question: "Bagaimana membuat sesi?", answer: "Answer"},
    {question: "Bagaimana membuat sesi?", answer: "Answer"},
    {question: "Bagaimana membuat sesi?", answer: "Answer"}
  ]
  }, 
  {option: "Sebelum Kelas",
  qa:[
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer"}
  ]
  }, 
  {option: "Sedang Kelas",
  qa:[
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer"}
  ]
  }, 
  {option: "Selesai Kelas",
  qa:[
    {question: "Dimana melihat nilai?", answer: "Answer"},
    {question: "Dimana melihat nilai?", answer: "Answer"},
    {question: "Dimana melihat nilai?", answer: "Answer"},
    {question: "Dimana melihat nilai?", answer: "Answer"}
  ]
  }
]

const studfaqInfo = [
  {option:"General",
  qa:[
    {question: "Apa itu kelas?", answer: "Answer stude"},
    {question: "Apa itu kelas?", answer: "Answer student"},
    {question: "Apa itu kelas?", answer: "Answer student"},
    {question: "Apa itu kelas?", answer: "Answer student"}
  ]
  }, 
  {option: "Semester Baru",
  qa:[
    {question: "Bagaimana membuat sesi?", answer: "Answer student"},
    {question: "Bagaimana membuat sesi?", answer: "Answer student"},
    {question: "Bagaimana membuat sesi?", answer: "Answer student"},
    {question: "Bagaimana membuat sesi?", answer: "Answer student"}
  ]
  }, 
  {option: "Sebelum Kelas",
  qa:[
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana menambah pertanyaan?", answer: "Answer student"}
  ]
  }, 
  {option: "Sedang Kelas",
  qa:[
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer student"},
    {question: "Bagaimana mengganti pertanyaan?", answer: "Answer student"}
  ]
  }, 
  {option: "Selesai Kelas",
  qa:[
    {question: "Dimana melihat nilai?", answer: "Answer student"},
    {question: "Dimana melihat nilai?", answer: "Answer student"},
    {question: "Dimana melihat nilai?", answer: "Answer student"},
    {question: "Dimana melihat nilai?", answer: "Answer student"}
  ]
  }
]


export default class FAQ extends Component {
  constructor(props){
    super(props);
    this.state ={
      role:null,
      search: "",
      info: null
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
  }
  async componentDidMount(){
    window.scrollTo(0, 0);
  }
  async handleChangeRole(value) {
    var info = [];
    if (value === "faculty"){
      info = proffaqInfo;
    }
    else if (value === "student"){
      info = studfaqInfo;
    }
    await this.setState({
      role: value,
      info : info
    });
  }

  informationDisplay(){
    return (<Information role={this.state.role} info={this.state.info}/>)
  }

  handleSearch(event){
    var value = event.target.value;
    this.setState({
      search: value,
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className='faq container'>
          <div className='content'> 
            <h1>Bantuan</h1>
            <p>Informasi mengenai harusbisa dan beberapa hal pertanyaan yang sering diajukan oleh pengguna</p>
            <input className="searchbar" type='text' placeholder='Cari bantuan' value={this.state.search} onChange={this.handleSearch}/>
            <div className="row buttons">
              <div className="col">
                <Button onClick={() => this.handleChangeRole("faculty")} className={this.state.role === "faculty" ? "button-selected button" : "button"}>Dosen</Button>
              </div>
              <div className="col">
                <Button onClick={() => this.handleChangeRole("student")} className={this.state.role === "student" ? "button-selected button" : "button"}>Mahasiswa</Button>
              </div>
            </div>

            <div className="information">
              {this.state.role && this.informationDisplay()}
            </div>
          </div>

        </div>
        <Footer/>
      </React.Fragment>     
    );
  }
}

class Information extends Component{
  constructor(props){
    super(props);
    this.state={
      value:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.information = this.information.bind(this);
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  information(){
    var qas = this.props.info[this.state.value].qa;
    var components = [];

    for (let i=0; i<qas.length; i++){
      var qa = qas[i]
      components.push(
        <div>
          <h5>{qa.question}</h5>
          <p>{qa.answer}</p>
        </div>
      )
    }

    return components;
  }

  renderButtons(){
    var components = [];
    var options = this.props.info

    for (let i=0; i<options.length; i++){
      var option = options[i].option
      components.push(<Button className={this.state.value === i ? "button button-selected" : "button"} onClick={()=>{this.handleChange(i)}}>{option}</Button>);
    }

    return components;
  }
  render(){
    return(
      <div className='row justify-content-end'>
        <div className="col-3 sidebar">
          {this.renderButtons()}
        </div>
        <div className="col-8">
          {this.information()}
        </div>
      </div>
    )
  }
}

class StudentFAQ extends Component{

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
          <h3> Student </h3>
          {this.information()}
        </div>

      </div>
    )
  }
}