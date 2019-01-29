import React, { Component } from "react";
import "./Home.css";
import logo from './logokrul.png';
import { Button} from "react-bootstrap";


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
          <div>
            <h1>Jadikan kelas anda interaktif dan efektif</h1>
            <Button className="Home-button" onClick={this.handleClick}> SIGN UP NOW! </Button>
          </div>
          <div>
            <img src={logo} className="App-logo"/>
          </div>
        </div>

        <div className="pricing">
          <div>
            <h1>HARGA</h1>
          </div>
        </div>

      </div>
    );
  }
}