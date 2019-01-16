import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers//Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Courses from './containers/Courses';
import Classes from './containers/ClassesTEMP';
import Lectures from './containers/Lectures';

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path ="/signup" component = {SignUp}/>
    <Route path ="/login" component = {Login}/>
    <Route path="/courses" component ={Courses}/>
    <Route path='/classes' component={Classes}/>
    <Route path='/lectures' component={Lectures}/>
    <Route component={NotFound} />
  </Switch>;