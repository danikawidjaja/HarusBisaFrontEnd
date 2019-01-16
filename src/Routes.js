import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers//Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Courses from './containers/Courses';

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path ="/signup" component = {SignUp}/>
    <Route path ="/login" component = {Login}/>
    <Route path="/courses" component ={Courses}/>
    <Route component={NotFound} />
  </Switch>;