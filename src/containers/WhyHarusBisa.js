import React, { Component } from "react";
import "./Page.css";
import logo from './logokrul.png';
import { Button} from "react-bootstrap";


export default class WhyHarusBisa extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-header-text">
            Why Harus Bisa?
          </h2>
        </div>

        <div className="App-content">
          <p className="App-caption-text"> because </p>
        </div>
      </div>

    );
  }
}