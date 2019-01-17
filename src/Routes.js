import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers//Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Courses from './containers/Courses';
import Lectures from './containers/Lectures';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <Route path ="/signup" exact component = {SignUp}/>
    <AppliedRoute path ="/login" exact component = {Login} props={childProps} />
    <Route path="/courses" component ={Courses}/>
    <Route path='/lectures' component={Lectures}/>
    <Route component={NotFound} />
  </Switch>;