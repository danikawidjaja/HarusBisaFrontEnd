import React, { Component } from "react";
import "./Home.css";
import landerpic from './landerpic.png';
import { Button } from 'reactstrap';
import Footer from '../Footer/Footer';
import laptop_img from "../Home/laptop.png";
import stack_img from "../Home/stack.png";
import time_img from "../Home/time.png";
import example_img from "../Home/example.png";

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
        <div className="lander container" id='#top'>
          <div class='row'>
            <div class='col-md-5 image order-md-2'>
              <img src={landerpic}/>
            </div>
            <div class='col-md-7 text order-md-1'>
              <h1>Teknologi Kelas Terkini</h1>
              <p>Revolusi kegiatan belajar<br/>mengajar di kampus secara gratis!</p>
              <Button onClick={this.handleClick}>Daftar Sekarang</Button>
            </div>
          </div>
        </div>

        <div className="about container area" id='#about'>
          <div style={{padding: '3rem 3rem 5rem'}}>
            <h1>Harus Bisa memberikan kesempatan untuk mahasiswa berinteraksi dan berpartisipasi di dalam ruang kelas.</h1>
          </div>
          <Benefit/>

        </div>

        <div className='pricing container area' id='#pricing'>
          <div className='row content'>
            <div class='col-lg-8'>
              <img src={example_img} alt="example" style={{maxWidth:"100%"}}/>
            </div>
            <div class='col-lg-4 example'>
              <p>Harus Bisa dibuat oleh sekelompok mahasiswa Indonesia yang tergerak untuk mengubah kegiatan belajar mengajar di Indonesia setelah terinspirasi saat berkuliah di Amerika Serikat.</p>
            </div>
          </div>
        </div>

        <Footer />

      </div>
    );
  }
}

class Benefit extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div class='row justify-content-center'>
            <div class='col-lg-4 benefit'>
              <img src={time_img} alt='icon'/>
            </div>
            <div class='col-lg-4 benefit'>
              <img src={laptop_img} alt='icon'/>
            </div>
            <div class='col-lg-4 benefit'>
              <img src={stack_img} alt='icon'/>
            </div>
          </div>
          <div class='row justify-content-center'>
            <div class='col-lg-4 benefit'>
              <h5>Interaksi Real Time</h5>
            </div>
            <div class='col-lg-4 benefit'>
              <h5>Mudah diakses</h5>
            </div>
            <div class='col-lg-4 benefit'>
              <h5>Data Oriented</h5>
            </div>
          </div>
          <div class='row justify-content-center'>
            <div class='col-lg-4 benefit'>
              <p>Mempermudah interaksi antara dosen dan mahasiswa. Dosen dapat mengerti secara langsung apa yang dipahami oleh mahasiswanya.</p>
            </div>
            <div class='col-lg-4 benefit'>
              <p>Harus Bisa dapat dibuka dengan segala jenis platform seperti laptop, smartphone, dan tablet.</p>
            </div>
            <div class='col-lg-4 benefit'>
              <p>Kami menyimpan dan melindungi data nilai secara aman untuk dosen dan mahasiswa.</p>
            </div>
          </div>
      </React.Fragment>
    )
  }
}