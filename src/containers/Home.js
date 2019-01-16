import React, { Component } from "react";
import "./Home.css";
import logo from './logokrul.png';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <img src={logo} className="App-logo"/>
          <h1>Harus Bisa</h1>
          <p>Classroom engagement web application</p>
        </div>
      </div>
    );
  }
}