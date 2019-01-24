import React, { Component } from "react";
import "./Page.css";
import {Link}  from 'react-router-dom';
import { Button} from "react-bootstrap";


export default class Questions extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-header-text">
            Questions
          </h2>
        </div>

        <div className="App-content">
          <p className="App-caption-text"> q </p>
          <Link to={'/lectures'} className='App-link'> Back to lectures </Link>
        </div>
      </div>

    );
  }
}