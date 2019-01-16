import React from "react";
import "./NotFound.css";
import {Link} from "react-router-dom";

export default () =>
  <div className="NotFound">
    <h3>Sorry, page not found!</h3>
    <Link to="/" className="App-link"> Return home </Link>
  </div>;