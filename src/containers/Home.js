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
            <h2>Harus Bisa</h2>
            <p>Jadikan kelas anda lebih interaktif dengan platform yang lebih baik</p>
            <Button className="Home-button" onClick={this.handleClick}> Sign Up Now! </Button>
          </div>
          <div>
            <img src={logo} className="App-logo"/>
          </div>
        </div>
      </div>
    );
  }
}