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
    <AppliedRoute path ="/signup" exact component = {SignUp} props={childProps}/>
    <AppliedRoute path ="/login" exact component = {Login} props={childProps} />
    <AppliedRoute path="/courses" component ={Courses} props={childProps}/>
    <AppliedRoute path='/lectures' component={Lectures} props={childProps}/>
    <AppliedRoute component={NotFound} props={childProps}/>
  </Switch>;