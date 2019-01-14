import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers//Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path ="/signup" component = {SignUp}/>
    <Route path ="/Login" component = {Login}/>
    <Route component={NotFound} />
  </Switch>;