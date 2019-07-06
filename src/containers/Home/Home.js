import React, { Component } from "react";
import "./Home.css";
import logo from './logokrul.png';
import landerpic from './landerpic.png';
import { Button } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from "react-router-dom";
import { OverrideMaterialUICss } from "override-material-ui-css";
import Footer from '../Footer/Footer';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: this.props.history
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.history.push('/signup');
  }
  async componentDidMount(){
    window.scrollTo(0, 0);
    if(this.props.Auth.loggedIn()){
      this.props.userHasAuthenticated(true);
      this.props.history.push('/courses');
    }
  }
  render() {
    return (
      <div className="Home">
        <div className="lander container area" id='#top'>
          <div class='row'>
            <div class='col-7 text'>
              <h1>Teknologi Kelas Terkini</h1>
              <p>Revolusi kegiatan belajar<br/>mengajar di kampus secara gratis!</p>
              <Button onClick={this.handleClick}>Daftar Sekarang</Button>
            </div>
            <div class='col-5 image'>
              <img src={landerpic}/>
            </div>
          </div>
        </div>

        <div className="about container area" id='#about'>
          <div style={{padding: '2rem 6rem 2rem 6rem'}}>
            <h1>HarusBisa memberikan kesempatan untuk mahasiswa berinteraksi dan berpartisipasi </h1>
          </div>
          <div class='row'>
            <div class='col benefit'>
              <img src={logo} alt='icon'/>
              <h5>Real Time Interaksi</h5>
              <p>Dengan adanya tanya jawab secara langung</p>
            </div>
            <div class='col benefit'>
              <img src={logo} alt='icon'/>
              <h5>Mudah diakses di semua platform</h5>
              <p>Dengan adanya tanya jawab secara langung</p>
            </div>
            <div class='col benefit'>
              <img src={logo} alt='icon'/>
              <h5>Data Oriented</h5>
              <p>Dengan adanya tanya jawab secara langung</p>
            </div>
          </div>

        </div>

        <div className='pricing container area' id='#pricing'>
          <div className='row content'>
            <div class='col'>
              Image
            </div>
            <div class='col'>
              <p>Berkontribusi untuk negara Indonesia adalah komitment kita, maka dari itu service ini Gratis!</p>
            </div>
          </div>
        </div>

        <Footer />

      </div>
    );
  }
}