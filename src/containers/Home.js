import React, { Component } from "react";
import "./Home.css";
import logo from './logokrul.png';
import landerpic from './landerpic.png';
import landerbackground from './landerbackground.png';
import facebook from './facebook.png';
import linkedin from './linkedin.png';
import twitter from './twitter.png';
import instagram from './instagram.png';
import { Button} from "react-bootstrap";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from "react-router-dom";
import { OverrideMaterialUICss } from "override-material-ui-css";
import Footer from './Footer';

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

  async componentWillMount(){
    if(this.props.Auth.loggedIn()){
      this.props.userHasAuthenticated(true);
      this.props.history.push('/courses');
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <img src="assets/images/header-bg.svg" class="img-fluid" alt=""/>
          <div className='text'>
            <h1>Jadikan kelas anda <br/> interaktif dan efektif</h1>
            <Button className="Home-button" onClick={this.handleClick}> DAFTAR SEKARANG! </Button>
          </div>
          <div className='image'>
            <img src={landerpic}/>
          </div>
        </div>

        <div className="about" id='#about'>
          <div>
            <h1>Cara untuk professor dan pengajar untuk mengimplementasi active learning</h1>
          </div>

          <div className='div1'>
            <div>
              <img src={logo} className="App-logo"/>
            </div>
            <div className='text'>
              <h5> Memotivasi setiap Mahasiswa untuk berpartisipasi </h5>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Pellentesque vel facilisis eros. Praesent diam augue, semper eu commodo ac </p>
            </div>
          </div>

          <div className='div2'>
            <div className='text'>
              <h5> Secara langsung dapat menilai dan mengetahui kinerja siswa </h5>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Pellentesque vel facilisis eros. Praesent diam augue, semper eu commodo ac </p>
            </div>
            <div>
              <img src={logo} className="App-logo"/>
            </div>
          </div>
        </div>

        <div className='pricing' id='#pricing'>
          <div className='content'>
            <Card raised='true' className='card'>
              <OverrideMaterialUICss>
                <CardContent>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Pellentesque vel facilisis eros. Praesent diam augue, semper eu commodo ac </p>
                </CardContent> 
              </OverrideMaterialUICss>
            </Card>
          </div>
        </div>

        <Footer />

      </div>
    );
  }
}