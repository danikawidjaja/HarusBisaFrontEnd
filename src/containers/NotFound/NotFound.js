import React,{ Component} from "react";
import "./NotFound.css";
import {Link} from "react-router-dom";
import pic from './hminianeh.png';
import { Button} from "react-bootstrap";

export default class NotFound extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    this.props.history.push('/');
  }

  async componentDidMount(){
    this.props.isNavVisible(false);
    window.scrollTo(0, 0);
  }

  render(){
    return(
      <div style={{paddingTop:'3vw'}}>
        <div className="NotFound"> 
          <div className='image'>
            <img src ={pic} />
          </div>
          <div className ='text'>
            <h1> hmm.. ini aneh </h1>
            <p> Terjadi kesalahan halaman yang anda minta </p>
            <br/>
            <Button className='n-button' onClick={this.handleClick}> Kembali ke Home </Button>
          </div>
        </div>
      </div>
    )
  }
}