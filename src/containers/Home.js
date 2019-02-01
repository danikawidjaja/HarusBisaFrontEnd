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
            <h1>Jadikan kelas anda interaktif dan efektif</h1>
            <Button className="Home-button" onClick={this.handleClick}> SIGN UP NOW! </Button>
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
          <div className='header'>
            <h1> HARGA </h1>
          </div>
          <div className='content'>
            <Card raised='true' className='card'>
              
              <CardMedia
                image='https://images.unsplash.com/photo-1519782202865-95bcf9f4aff5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                title='student'
                style={{height:0, paddingTop: '56.25%'}}
              />
              <CardContent>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Pellentesque vel facilisis eros. Praesent diam augue, semper eu commodo ac </p>
              </CardContent>
              
            </Card>
          </div>
        </div>

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

      </div>
    );
  }
}