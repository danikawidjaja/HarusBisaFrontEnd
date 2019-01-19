import React, { Component } from "react";
import "./Page.css";
import logo from './logokrul.png';
import { Button} from "react-bootstrap";


export default class Pricing extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-header-text">
            Pricing
          </h2>
        </div>

        <div className="App-content">
          <p className="App-caption-text"> pricing </p>
        </div>
      </div>

    );
  }
}